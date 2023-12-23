"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addCarType } from "@/services/server-actions/addRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CarTypeForm } from "../shared/FormCommon";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCarTypeById } from "@/hooks/useGet";
import { CarType } from "@prisma/client";
import { Loader, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const carTypeFormSchema = z
  .object({
    brand: z.string(),
    model: z.string(),
    beginYear: z.number().min(1920).max(2023),
    endYear: z.number().min(1920).max(2023),
    engine: z.number().min(1).max(10),
    gasoline: z.enum(["D", "A92", "A95", "A98", "A100"]),
    transmission: z.enum(["Mechanical", "Automatic"]),
  })
  .required();
export const CreateCarTypeModalHOC = ({
  carTypeId,
  onSuccess,
}: {
  carTypeId: number;
  onSuccess: (ctId: number) => void;
}) => {
  const carType = useGetCarTypeById(
    carTypeId === -1 ? undefined : carTypeId.toString()
  );
  if (carType === null) {
    return (
      <Button className="w-[20px] h-[20px] p-0" variant="ghost" type="button">
        <Loader2 size={20} />
      </Button>
    );
  }
  return <CreateCarTypeModal carType={carType} onSuccess={onSuccess} />;
};

const CreateCarTypeModal = ({
  carType,
  onSuccess,
}: {
  carType: CarType | null | undefined;
  onSuccess: (ctId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof carTypeFormSchema>>({
    resolver: zodResolver(carTypeFormSchema),
    defaultValues: {
      beginYear: carType?.beginYear || 1920,
      endYear: carType?.endYear || 2023,
      engine: carType?.engine || 1,
      model: carType?.model || "",
      brand: carType?.brand || "",
      transmission: carType?.transmission || "Automatic",
      gasoline: carType?.gasoline || "A95",
    },
  });

  async function onSubmit(values: z.infer<typeof carTypeFormSchema>) {
    try {
      const res = await addCarType(values);
      onSuccess(res.carTypeId);
      setIsOpen(false);
      form.reset();
    } catch (error) {}
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-[20px] h-[20px] p-0" variant="ghost">
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new row to table.</DialogTitle>
          <DialogDescription>
            Choose the table where you want to add value.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
            id="create_car_type"
          >
            <CarTypeForm control={form.control} />
            <Button type="submit" className="w-full" form="create_car_type">
              Create car type
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
