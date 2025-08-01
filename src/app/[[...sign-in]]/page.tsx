"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/login";
import { LoginSchema, loginSchema } from "@/lib/formValidationSchemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: LoginSchema) {
    const result = await login(values);
    if (result.success?.status) {
      toast.success(result.success.message);
      // redirect to dashboard
      router.push("/dashboard");
    } else {
      toast.error(result.error.message);
    }
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800 px-4">
      <Card className="mx-auto max-w-sm">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-3/5 mx-auto mt-5"
        />
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masukkan username dan password Anda untuk masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="masukkan username" {...field} />
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
                        type="password"
                        placeholder="masukkan Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-3 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* <Card className="absolute bottom-0 right-0 space-y-2 bg-white p-5 shadow-md rounded-xl">
        <p>username : admin</p>
        <p>password : user123</p>
      </Card> */}
    </div>
  );
}
