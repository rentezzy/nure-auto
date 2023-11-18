"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CarSpentForm, MaintenanceSelect } from "../shared/FormCommon";
import { Calendar } from "../ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const carSpentTypesArr = [
  "MAINTENANCE",
  "GASOLINE",
  "REPAIR",
  "INSURANCE",
  "OTHER",
] as const;
const carSpentTypes = {
  MAINTENANCE: "Maintenance",
  GASOLINE: "Gasoline",
  REPAIR: "Repair",
  INSURANCE: "Insurance",
  OTHER: "Other",
} as const;
const carSpentFormSchema = z
  .object({
    amount: z.number(),
    carId: z.number(),
    type: z.enum(carSpentTypesArr),
    date: z.date(),
    maintenanceId: z.string().nullable(),
    price: z.number().min(1),
    description: z.string(),
  })
  .required();

export const AddCarSpentForm = ({
  carId,
  onSuccess,
}: {
  carId: number;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof carSpentFormSchema>>({
    resolver: zodResolver(carSpentFormSchema),
    defaultValues: {
      carId,
      amount: 1,
      date: new Date(Date.now() - 100000),
      description: "",
      price: 1,
      type: "MAINTENANCE",
      maintenanceId: null,
    },
  });
  const watchSelectedType = form.watch("type");
  useEffect(() => {
    if (watchSelectedType === "MAINTENANCE") {
      form.unregister("amount");
      form.unregister("description");
      form.unregister("price");
      form.register("maintenanceId");
      form.clearErrors();
      form.setValue("amount", 1);
      form.setValue("description", "");
      form.setValue("price", 1);
    } else {
      form.register("amount");
      form.register("description");
      form.register("price");
      form.unregister("maintenanceId");
      form.clearErrors();
      form.setValue("maintenanceId", null);
    }
  }, [watchSelectedType]);
  async function onSubmit(values: z.infer<typeof carSpentFormSchema>) {
    try {
      console.log(values);
      onSuccess();
      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spent type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a spent type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {carSpentTypesArr.map((type) => (
                    <SelectItem key={type} value={type}>
                      {carSpentTypes[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchSelectedType === "MAINTENANCE" ? (
          <FormField
            control={form.control}
            name="maintenanceId"
            render={({ field }) => (
              <MaintenanceSelect field={field} carId={carId} />
            )}
          />
        ) : (
          <CarSpentForm control={form.control} />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Buy at</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
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
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add spent
        </Button>
      </form>
    </Form>
  );
};
