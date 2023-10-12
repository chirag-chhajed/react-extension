// React and Hooks
import { useEffect, useState } from "react";

// Form and Form Validation
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  boolean,
  minLength,
  url as valibotUrl,
  safeParse,
  Output,
  optional,
} from "valibot";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// External Libraries
import { toast } from "sonner";
import { useAtom } from "jotai";
import { addDoc, Timestamp } from "firebase/firestore";

// Custom Utilities
import { fetchTitleAndDescription } from "@/lib/fetchTitleAndDescription";
import { faviconURL } from "@/lib/getFaviconUrl";

// Authentication and State Management
import { userAuthAtom } from "@/App";

// Analytics and Firestore
import { siteRef } from "@/background/background";

const SiteSchema = object({
  title: string([minLength(5, "title must have at least 6 characters")]),
  url: string(),
  description: optional(string()),
  isPin: boolean(),
});

type SiteData = Output<typeof SiteSchema>;

const SiteForm = () => {
  const [url, setUrl] = useState("");
  const [debouncedUrl, setDebouncedUrl] = useState("");
  const [user] = useAtom(userAuthAtom);

  const form = useForm({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      isPin: false,
    },
    resolver: valibotResolver(SiteSchema),
  });

  useEffect(() => {
    const deboundeTimeout = setTimeout(() => {
      let tempUrl = url.trim();
      if (
        !tempUrl.startsWith("https://") &&
        !tempUrl.startsWith("http://") &&
        !tempUrl.startsWith("www.")
      ) {
        tempUrl = `https://${tempUrl}`;
      }
      setDebouncedUrl(tempUrl);
      return () => clearTimeout(deboundeTimeout);
    }, 1000);
  }, [url]);

  const valildation = string([valibotUrl("not a valid url")]);

  useEffect(() => {
    const debouncedTimeout = setTimeout(() => {
      if (debouncedUrl) {
        try {
          const result = safeParse(valildation, debouncedUrl);
          console.log(result);
          if (result.success) {
            const response = fetchTitleAndDescription(debouncedUrl);
            response.then((res) => {
              const title = form.getValues("title");
              const description = form.getValues("description");
              form.setValue("title", title + " " + res.title ?? "");
              form.setValue(
                "description",
                description + " " + res.description ?? ""
              );
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 1000);

    return () => clearTimeout(debouncedTimeout);
  }, [debouncedUrl]);

  const onSubmit = async (data: SiteData): Promise<void> => {
    try {
      const res = await addDoc(siteRef, {
        ...data,
        url: debouncedUrl,
        user_id: user?.uid,
        favicon: faviconURL(data.url),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      console.log("added to db", res);
      toast.success("Site Added");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add the site");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="URL of the site"
                  onChange={(e) => {
                    field.onChange(e);
                    setUrl(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-64"
                  {...field}
                  placeholder="description"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Pin it</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SiteForm;
