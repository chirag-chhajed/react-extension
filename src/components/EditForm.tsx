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
import { useEffect, useState } from "react";
import { fetchTitleAndDescription } from "@/lib/fetchTitleAndDescription";
import { faviconURL } from "@/lib/getFaviconUrl";
import { Timestamp, updateDoc } from "firebase/firestore";
import { getDocumentRef } from "@/background/background";
import { toast } from "sonner";

const SiteSchema = object({
  title: string([minLength(5, "title must have at least 6 characters")]),
  url: string(),
  description: optional(string()),
  isPin: boolean(),
});

interface EditFormProps {
  dataId: string;
  url: string;
  title: string;
  description: string;
  isPin: boolean;
}

type SiteData = Output<typeof SiteSchema>;

const EditForm = ({
  dataId,
  url,
  title,
  description,
  isPin,
}: EditFormProps) => {
  const [url_, setUrl] = useState("");
  const [debouncedUrl, setDebouncedUrl] = useState("");
  const form = useForm({
    defaultValues: {
      title: title,
      url: url,
      description: description,
      isPin: isPin,
    },
    resolver: valibotResolver(SiteSchema),
  });

  useEffect(() => {
    const deboundeTimeout = setTimeout(() => {
      let tempUrl = url_.trim();
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
  }, [url_]);

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
              form.setValue("title", res.title ?? "");
              form.setValue("description", res.description ?? "");
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
      await updateDoc(getDocumentRef("sites", dataId), {
        ...data,
        url: debouncedUrl,
        favicon: faviconURL(data.url),
        updated_at: Timestamp.now(),
      });
      toast.success("Site updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating site");
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

export default EditForm;
