"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, setTransition] = useTransition();

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransition(() => {
      login(values)
        .then((res) => {
          console.log({ res });
          if (res.success) {
            setSuccessMessage(res.message);
            setErrorMessage("");

            // If the user had a configuration saved before loggin in
            // redirect to that configuration page
            const configurationId = localStorage.getItem("configurationId");
            if (configurationId) {
              router.push(`/configure/preview?id=${configurationId}`);
            } else {
              router.replace("/");
            }
          } else {
            setErrorMessage(res.message);
            setSuccessMessage("");
          }
        })
        .catch((error) => {
          setErrorMessage("Something went wrong!");
        });
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center text-xl">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john@example.com"
                        type="email"
                        disabled={isPending}
                      />
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
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormSuccess message={successMessage} />
            <FormError message={errorMessage} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal mx-auto text-gray-600">
          <Link href="/auth/register">Don't have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
