import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { object, string, boolean, minLength /*Output*/ } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { ChangeEvent } from "react";

const SiteSchema = object({
  title: string([minLength(5, "title must have at least 6 characters")]),
  url: string(),
  description: string(),
  isPin: boolean(),
});

// const onSubmit = (data: SiteData) => {
//   console.log(data);
// };

const HabitForm = () => {
  //   type SiteData = Output<typeof SiteSchema>;

  const form = useForm({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      isPin: false,
    },
    resolver: valibotResolver(SiteSchema),
  });
  //   const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     let enteredUrl = e.target.value;

  //     // Check if the entered URL has a valid protocol or "www." at the start
  //     if (
  //       !enteredUrl.startsWith("https://") &&
  //       !enteredUrl.startsWith("http://") &&
  //       !enteredUrl.startsWith("www.")
  //     ) {
  //       // If not, add "https://"
  //       enteredUrl = `https://${enteredUrl}`;
  //     }

  //     // Return the updated URL
  //     return enteredUrl;
  //   };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          let url = e.url;
          if (!url.startsWith("https://") && !url.startsWith("http://")) {
            // If not, add "https://"
            url = `https://${url}`;
          }

          // Check if the entered URL starts with "www."
          if (!url.startsWith("https://www.")) {
            // If not, add "www."
            url = url.replace("https://", "https://www.");
          }
          console.log("url", url);
          console.log({ ...e, url });
        })}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="title" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>url</FormLabel>
              <FormControl>
                <Input {...field} placeholder="url of the site" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="description" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pin it</FormLabel>

              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default HabitForm;
