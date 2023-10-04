// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { object, string, email, minLength, type Output } from "valibot";
// import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "./ui/button";
import { userAuthAtom } from "@/App";
import { useAtom } from "jotai";
import { GithubIcon } from "lucide-react";

const LoginForm = () => {
  const [, setUser] = useAtom(userAuthAtom);

  // const LoginSchema = object({
  //   email: string([
  //     minLength(6, "email must have at least 6 characters"),
  //     email("The email address is badly formatted."),
  //   ]),
  //   password: string([
  //     minLength(10, "password must have at least 10 characters"),
  //   ]),
  // });
  // type LoginData = Output<typeof LoginSchema>;

  // const form = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   resolver: valibotResolver(LoginSchema),
  // });
  // const onSubmit = (data: LoginData) => {
  //   console.log("form submiited clicked");
  //   chrome.runtime.sendMessage({ action: "client", data: data }, (response) => {
  //     console.log(response);
  //     if (response.success) {
  //       console.log("Data passage working");
  //       form.reset();
  //     } else {
  //       console.log("Data passage not working");
  //     }
  //   });
  // };
  const googleLogin = () => {
    chrome.runtime.sendMessage({ action: "googleLogin" }, (response) => {
      console.log(response);
      if (response.success) {
        setUser(response.user);
        console.log("Data passage working");
      } else {
        console.log("Data passage not working");
      }
    });
  };

  return (
    <div className="container grid h-screen mx-auto md:grid-cols-2">
      {/* <Form {...form}>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
      <div className="items-center justify-center hidden h-full md:flex bg-primary text-primary-foreground ">
        <h1 className="font-mono text-4xl font-bold text-center">
          Swift Search
        </h1>
      </div>
      <div className="flex items-center justify-center h-full">
        <Button onClick={() => googleLogin()}>
          <GithubIcon className="mr-2" />
          Google Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
