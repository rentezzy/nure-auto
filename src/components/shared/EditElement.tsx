import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { EditCarForm, EditCarTypeForm, EditUserForm } from "./EditForm";
import {
  useGetCarById,
  useGetCarTypeById,
  useGetUserById,
} from "@/hooks/useGet";

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
export const CarEditForm = ({ id }: { id?: string }) => {
  const car = useGetCarById(id);
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
          <DialogTitle>Edit car with id:{id}</DialogTitle>
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
