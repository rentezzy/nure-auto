import { useGetCarTypeById } from "@/hooks/useGet";
import {
  updateCar,
  updateCarType,
  updateUser,
} from "@/services/server-actions/updateRow";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, CarType, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { CarFormMini, CarTypeForm, UserForm } from "./FormCommon";

const userFormSchema = z.object({
  email: z.string().min(2).max(50).email("Must be email"),
  password: z.string().min(2).max(50),
});
export const EditUserForm = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user.email,
      password: user.password,
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      await updateUser(user.userId, values);
      toast({
        title: "User update.",
        description: "User successfuly updated.",
      });
    } catch (error) {
      form.setError("email", { message: "This email already exist" });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UserForm control={form.control} />
        <Button type="submit">Update user</Button>
      </form>
    </Form>
  );
};
const carFormSchema = z.object({
  buyAt: z.date().max(new Date()),
  mileage: z.number().min(0).max(1_000_000),
  year: z.number().min(1920).max(2023),
  price: z.number().min(1).max(1_000_000_000),
});
export const EditCarForm = ({ car }: { car: Car }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      buyAt: new Date(car.buyAt),
      mileage: car.mileage,
      price: car.price,
      year: car.year,
    },
  });
  const carType = useGetCarTypeById(car.carTypeId.toString());
  const yearFrom = carType?.beginYear || 1920;
  const yearTo = carType?.endYear || 2023;
  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    try {
      await updateCar(car.carId, values);
      toast({
        title: "Car update.",
        description: "Car successfully updated.",
      });
      router.refresh();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CarFormMini
          control={form.control}
          yearFrom={yearFrom}
          yearTo={yearTo}
        />
        <Button type="submit" className="w-full">
          Update car
        </Button>
      </form>
    </Form>
  );
};

const carTypeFormSchema = z.object({
  brand: z.string(),
  model: z.string(),
  beginYear: z.number().min(1920).max(2023),
  endYear: z.number().min(1920).max(2023),
  engine: z.number().min(1).max(10),
  gasoline: z.enum(["D", "A92", "A95", "A98", "A100"]),
  transmission: z.enum(["Mechanical", "Automatic"]),
});
export const EditCarTypeForm = ({ carType }: { carType: CarType }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof carTypeFormSchema>>({
    resolver: zodResolver(carTypeFormSchema),
    defaultValues: {
      beginYear: carType.beginYear,
      endYear: carType.endYear,
      engine: carType.engine,
      model: carType.model,
      brand: carType.brand,
      transmission: carType.transmission,
      gasoline: carType.gasoline,
    },
  });

  async function onSubmit(values: z.infer<typeof carTypeFormSchema>) {
    try {
      await updateCarType(carType.carTypeId, values);
      toast({
        title: "Car type update.",
        description: "Car type successfuly updated.",
      });
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CarTypeForm control={form.control} />
        <Button type="submit">Update car type</Button>
      </form>
    </Form>
  );
};
