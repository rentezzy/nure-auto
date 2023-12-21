"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { cn, formatDate } from "@/lib/utils";
import { deleteCarSpent } from "@/services/server-actions/deleteRow";
import { updateSpent } from "@/services/server-actions/updateRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarSpent } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { CalendarIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CarSpentForm, MaintenanceSelect } from "../shared/FormCommon";
import { Calendar } from "../ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { TableCell } from "../ui/table";

const carSpentTypes = {
  MAINTENANCE: "Maintenance",
  GASOLINE: "Gasoline",
  REPAIR: "Repair",
  INSURANCE: "Insurance",
  OTHER: "Other",
} as const;

const carSpentTypesArr = [
  "MAINTENANCE",
  "GASOLINE",
  "REPAIR",
  "INSURANCE",
  "OTHER",
] as const;
export const SpentCard = ({ spent }: { spent: CarSpent }) => {
  const spentAt = new Date(spent.date);
  const formatted = `${spentAt.getFullYear()}-${
    spentAt.getMonth() + 1
  }-${spentAt.getDate()}`;
  return (
    <>
      <TableCell className="min-w-[200px] max-w-[200px] px-4">
        <p>{carSpentTypes[spent.type]}</p>
      </TableCell>
      <TableCell className="min-w-[200px] max-w-[200px] px-4">
        <p className="whitespace-nowrap">{formatted}</p>
      </TableCell>
      <TableCell className="min-w-[200px] max-w-[200px] px-4">
        <p>Price: {spent.price}$</p>
        <p>Amount: {spent.amount} pc&apos;s</p>
      </TableCell>
      <TableCell className="min-w-[200px] max-w-[200px] px-4">
        <p>{spent.price * spent.amount}$</p>
      </TableCell>
      <TableCell className="min-w-[200px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap float-left inline-block px-4">
        {spent.description}
      </TableCell>
      <TableCell className="flex-grow-1 w-full flex justify-end">
        <SpentModal spent={spent} />
      </TableCell>
    </>
  );
};
const SpentModal = ({ spent }: { spent: CarSpent }) => {
  const [editMode, setEditMode] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();
  const formatted = formatDate(new Date(spent.date));
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between pr-4">
            <p>Car spent from: {formatted}</p>
            <div className="space-x-2">
              <Button
                className="p-0 w-[20px] h-[20px]"
                variant="ghost"
                type="button"
                onClick={() => setEditMode((prev) => !prev)}
              >
                <Pencil />
              </Button>
              <Button
                className="p-0 w-[20px] h-[20px]"
                variant="ghost"
                type="button"
                onClick={() => {
                  deleteCarSpent(spent.carSpentId);
                  setIsOpened(false);
                  router.refresh();
                }}
              >
                <Trash color="red" />
              </Button>
            </div>
          </DialogTitle>
          {editMode ? (
            <EditCarSpentForm
              spent={spent}
              onSuccess={() => setEditMode(false)}
            />
          ) : (
            <>
              <DialogDescription>Info about your spent.</DialogDescription>
              <div className="space-y-2">
                <div>
                  Spent type:{" "}
                  <p className="px-2">{carSpentTypes[spent.type]}</p>
                </div>
                <div>
                  Price: <p className="px-2">{spent.price}$</p>
                  Amount: <p className="px-2">{spent.amount}</p>
                  Total: <p className="px-2">{spent.price * spent.amount}$</p>
                </div>
                <div className="whitespace-break-spaces break-words max-w-md">
                  Description: <p className="px-2">{spent.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

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
export const EditCarSpentForm = ({
  spent,
  onSuccess,
}: {
  spent: CarSpent;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof carSpentFormSchema>>({
    resolver: zodResolver(carSpentFormSchema),
    defaultValues: {
      ...spent,
      date: new Date(spent.date),
      maintenanceId: `${spent.maintenanceId}`,
    },
  });
  const router = useRouter();

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
    if (values.type === "MAINTENANCE" && !values.maintenanceId) {
      form.setError("maintenanceId", {
        message: "You must specify the maintenance",
      });
      return;
    }
    try {
      await updateSpent(spent.carSpentId, {
        ...values,
        maintenanceId: values.maintenanceId
          ? parseInt(values.maintenanceId)
          : null,
      });
      onSuccess();
      router.refresh();
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
              <MaintenanceSelect field={field} carId={spent.carId} />
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
              <FormLabel>Spent at</FormLabel>
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
          Update car spent
        </Button>
      </form>
    </Form>
  );
};
