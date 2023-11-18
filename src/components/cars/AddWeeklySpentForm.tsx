"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { getCurrentWeekAndYear } from "@/lib/utils";
import { addWeeklyCarSpent } from "@/services/server-actions/carSpent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const carWeeklyFormSchema = z
  .object({
    mileage: z.number().min(0).max(1_000_000),
    averageGasoline: z.number().min(1).max(50),
  })
  .required();

export const AddCarWeeklySpentForm = ({
  carId,
  onSuccess,
}: {
  carId: number;
  onSuccess: () => void;
}) => {
  const toast = useToast();
  const form = useForm<z.infer<typeof carWeeklyFormSchema>>({
    resolver: zodResolver(carWeeklyFormSchema),
    defaultValues: {
      averageGasoline: 0,
      mileage: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof carWeeklyFormSchema>) {
    const { year, week } = getCurrentWeekAndYear();
    try {
      await addWeeklyCarSpent({
        ...values,
        carId,
        year,
        weekNumber: week,
      });
      onSuccess();
      form.reset();
    } catch (error) {
      toast.toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage till the current week.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mileage"
                  type="number"
                  {...field}
                  value={`${field.value}`}
                  onChange={(e) =>
                    field.onChange(
                      Number.isNaN(parseFloat(e.target.value))
                        ? 1
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="averageGasoline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Average gasoline spent per 100 Km, till the current week(in
                Liters).
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Gasoline"
                  type="number"
                  {...field}
                  value={`${field.value}`}
                  onChange={(e) =>
                    field.onChange(
                      Number.isNaN(parseFloat(e.target.value))
                        ? 1
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
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
