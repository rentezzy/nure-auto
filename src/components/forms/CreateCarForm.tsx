"use client";
import { useGetCarTypeById } from "@/hooks/useGet";
import { addCar } from "@/services/server-actions/addRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CarTypeSelect } from "../shared/CarTypeSelect";
import { CarFormMini } from "../shared/FormCommon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const carFormSchema = z
  .object({
    buyAt: z.date(),
    carTypeId: z.number(),
    mileage: z.number().min(0).max(1_000_000),
    year: z.number().min(1920).max(2023),
    userId: z.number(),
    price: z.number().min(1).max(1_000_000_000),
  })
  .required();
export const CreateCarForm = ({ uid }: { uid: number }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      buyAt: new Date(Date.now() - 100000),
      mileage: 0,
      price: 1,
      year: 2000,
      userId: uid,
      carTypeId: -1,
    },
  });
  const carTypeId = form.watch("carTypeId");
  const carType = useGetCarTypeById(carTypeId.toString());
  const yearFrom = carType?.beginYear || 1920;
  const yearTo = carType?.endYear || 2023;
  useEffect(() => {
    if (yearFrom !== 1920) {
      form.setValue("year", yearFrom);
    }
  }, [yearFrom]);
  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    if (values.carTypeId === -1) {
      form.setError("carTypeId", {
        message: "You must specify which car is it.",
      });
      return;
    }
    try {
      await addCar(values);
      router.push("/dashboard");
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <CarFormMini
            control={form.control}
            yearFrom={yearFrom}
            yearTo={yearTo}
          />
        </div>
        <CarTypeSelect control={form.control} carTypeId={carTypeId}/>
        <Button type="submit" className="w-full">
          Add car!
        </Button>
      </form>
    </Form>
  );
};
