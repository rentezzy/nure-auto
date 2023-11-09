"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addCar, addCarType, addUser } from "@/services/server-actions/addRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CarForm, CarTypeForm, UserForm } from "./FormCommon";

const userFormSchema = z
  .object({
    email: z.string().min(2).max(50).email("Must be email"),
    password: z.string().min(2).max(50),
  })
  .required();

export const AddUserForm = () => {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      await addUser(values);
      form.reset();
    } catch (error) {
      form.setError("email", { message: "This email already exist" });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UserForm control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
const carFormSchema = z
  .object({
    buyAt: z.date().max(new Date()),
    carTypeId: z.string(),
    mileage: z.number().min(0).max(1_000_000),
    year: z.number().min(1920).max(2023),
    userId: z.string(),
    price: z.number().min(1).max(1_000_000_000),
  })
  .required();

export const AddCarForm = () => {
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      buyAt: new Date(Date.now() - 2000),
      mileage: 0,
      price: 0,
      year: 2000,
    },
  });

  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    try {
      await addCar({
        ...values,
        carTypeId: +values.carTypeId,
        userId: +values.userId,
      });
      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CarForm control={form.control} />
        <Button type="submit">Create Car</Button>
      </form>
    </Form>
  );
};

const carTypeFormSchema = z
  .object({
    brand: z.string(),
    model: z.string(),
    beginYear: z.number().min(1920).max(2023),
    endYear: z.number().min(1920).max(2023),
    engine: z.number().min(0).max(10),
    gasoline: z.enum(["D", "A92", "A95", "A98", "A100"]),
    transmission: z.enum(["Mechanical", "Automatic"]),
  })
  .required();
export const AddCarTypeForm = () => {
  const form = useForm<z.infer<typeof carTypeFormSchema>>({
    resolver: zodResolver(carTypeFormSchema),
    defaultValues: {
      beginYear: 1920,
      endYear: 2023,
      engine: 0,
      model: "",
      brand: "",
      transmission: "Automatic",
      gasoline: "A95",
    },
  });

  async function onSubmit(values: z.infer<typeof carTypeFormSchema>) {
    try {
      await addCarType(values);
      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CarTypeForm control={form.control} />
        <Button type="submit">Create car type</Button>
      </form>
    </Form>
  );
};
