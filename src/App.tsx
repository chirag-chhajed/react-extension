/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { object, string, email, minLength, type Output } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

export default function Home() {
  // const [value, setValue] = useState("");

  // useEffect(() => {
  //   chrome.runtime.sendMessage(
  //     { action: "client", data: value },
  //     (response) => {
  //       console.log(response);
  //       if (response.success) {
  //         console.log("Data passage working");
  //       } else {
  //         console.log("Data passage not working");
  //       }
  //     }
  //   );
  // }, [value]);
  const LoginSchema = object({
    email: string([
      minLength(6, "email must have at least 6 characters"),
      email("The email address is badly formatted."),
    ]),
    password: string([
      minLength(10, "password must have at least 10 characters"),
    ]),
  });
  type LoginData = Output<typeof LoginSchema>;

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: valibotResolver(LoginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log("form submiited clicked");
    chrome.runtime.sendMessage({ action: "client", data: data }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
        form.reset();
      } else {
        console.log("Data passage not working");
      }
    });
  };

  const googleLogin = () => {
    chrome.runtime.sendMessage({ action: "googleLogin" }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
      } else {
        console.log("Data passage not working");
      }
    });
  };

  const signOut = () => {
    chrome.runtime.sendMessage({ action: "signOut" }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
      } else {
        console.log("Data passage not working");
      }
    });
  };

  const getBookmarks = () => {
    chrome.permissions.request(
      {
        permissions: ["bookmarks"],
      },
      (granted) => {
        if (granted) {
          chrome.bookmarks.getTree((bookmarkTree) => {
            for (const node of bookmarkTree) {
              console.log(
                node.children?.map((child) =>
                  child.children?.map((child) => child.url)
                )
              );
              console.log(
                node.children?.map((child) =>
                  child.children?.map((child) => child.url)
                ).length
              );
            }
          });
        } else {
          console.log("Not granted");
        }
      }
    );
  };

  return (
    <div className="grid place-content-center">
      <Button onClick={() => googleLogin()}>Google Login</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email" />
                </FormControl>
                <FormDescription>Enter your email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="password" />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button onClick={() => signOut()}>SignOut</Button>
      <div className="p-4">
        <Button onClick={() => getBookmarks()} variant={"secondary"}>
          Would you like to add your bookmarks too?
        </Button>
      </div>
    </div>
  );
}
