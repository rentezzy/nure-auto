"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCarTypeById, useGetUserById } from "@/hooks/useGet";
import { Car } from "@prisma/client";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { EditCarForm, EditCarTypeForm, EditUserForm } from "./EditForm";

export const UserEditForm = ({ id }: { id?: string }) => {
  const user = useGetUserById(id);
  if (!id) return;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 w-[30px] h-[30px]">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user with id:{id}</DialogTitle>
        </DialogHeader>
        {user && <EditUserForm user={user} />}
      </DialogContent>
    </Dialog>
  );
};
export const CarEditForm = ({ car }: { car: Car }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 w-[30px] h-[30px]" variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit car</DialogTitle>
        </DialogHeader>
        {car && <EditCarForm car={car} />}
      </DialogContent>
    </Dialog>
  );
};
export const CarTypeEditForm = ({ id }: { id?: string }) => {
  const carType = useGetCarTypeById(id);
  if (!id) return;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 w-[30px] h-[30px]">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit car type with id:{id}</DialogTitle>
        </DialogHeader>
        {carType && <EditCarTypeForm carType={carType} />}
      </DialogContent>
    </Dialog>
  );
};
