"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserForm } from "../shared/FormCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const authFormSchema = z.object({
  email: z.string().min(2).max(50).email("Must be email"),
  password: z.string().min(2).max(50),
});
export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if ("error" in data) throw new Error(data.error);
      router.push("/");
    } catch (error) {
      if (error && typeof error == "object" && "message" in error)
        form.setError("root", {
          message: String(error.message) || "Something went wrong.",
        });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserForm control={form.control} />
        <p className="text-center text-red-600">
          {form.formState.errors.root?.message}
        </p>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};
export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if ("error" in data) throw new Error(data.error);
      router.push("/");
    } catch (error) {
      if (error && typeof error == "object" && "message" in error)
        form.setError("root", {
          message: String(error.message) || "Something went wrong.",
        });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserForm control={form.control} />
        <p className="text-center text-red-600">
          {form.formState.errors.root?.message}
        </p>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
