"use client";

import { Button } from "@/components/ui/button";
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
import { useGetCarTypes } from "@/hooks/useGetCarTypesId";
import { useGetUsersId } from "@/hooks/useGetUsersId";
import { addCar, addCarType, addUser } from "@/services/server-actions/addRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CarTypeBrandSelect, CarTypeModelSelect } from "./FormCommon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
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
      await addUser(values.email, values.password);
      form.reset();
    } catch (error) {
      form.setError("email", { message: "This email already exist" });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
    price: z.number().min(0).max(1_000_000_000),
  })
  .required();

export const AddCarForm = () => {
  const usersId = useGetUsersId();
  const carTypesId = useGetCarTypes();
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
  });

  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    try {
      await addCar({
        ...values,
        carTypeId: +values.carTypeId,
        userId: +values.userId,
      });
      console.log(1);
      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mileage"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Year"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buyAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Buy at</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        `${field.value.getFullYear()}-${
                          field.value.getMonth() + 1
                        }-${field.value.getDate()}`
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user id" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usersId &&
                    usersId.map((userId) => (
                      <SelectItem
                        key={userId.userId}
                        value={`${userId.userId}`}
                      >
                        {userId.userId}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car type Id</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a car type id" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carTypesId &&
                    carTypesId.map((carTypeId) => (
                      <SelectItem
                        key={carTypeId.carTypeId}
                        value={`${carTypeId.carTypeId}`}
                      >
                        {carTypeId.carTypeId}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="brand"
          render={CarTypeBrandSelect}
        />
        <FormField
          control={form.control}
          name="model"
          render={CarTypeModelSelect}
        />
        <FormField
          control={form.control}
          name="beginYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Year"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Year"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="engine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine, L.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Engine"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gasoline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gasoline type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gasoline type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["D", "A92", "A95", "A98", "A100"].map((gasoline) => (
                    <SelectItem key={gasoline} value={gasoline}>
                      {gasoline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmission type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transmission type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Mechanical", "Automatic"].map((transmission) => (
                    <SelectItem key={transmission} value={transmission}>
                      {transmission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create car type</Button>
      </form>
    </Form>
  );
};
