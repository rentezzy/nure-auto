"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCarTypeById, useGetUserById } from "@/hooks/useGet";
import {
  deleteCar,
  deleteCarType,
  deleteUser,
} from "@/services/server-actions/deleteRow";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "../ui/dataTable";
import { useToast } from "../ui/use-toast";

export const UserDeleteForm = ({ id }: { id?: string }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const user = useGetUserById(id);
  if (!id) return;
  const onClick = async () => {
    try {
      deleteUser(parseFloat(id));
      toast({
        title: "Delete successful",
        description: `User with id :${id} successfuly deleted.`,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong.`,
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-[30px] h-[30px] p-0">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user with id:{id}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? All his cars will also be
            removed.
            {user && (
              <DataTable
                data={[user]}
                columns={Object.keys(user).map((userKey) => ({
                  accessorKey: userKey,
                  header: userKey,
                }))}
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClick} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export const CarDeleteForm = ({ id, name }: { id: number; name: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClick = async () => {
    try {
      deleteCar(id);
      toast({
        title: "Delete successful",
        description: `${name} successfully deleted.`,
      });
      setIsOpen(false);
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong.`,
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-[30px] h-[30px] p-0">
          <Trash color="#ef4444" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {name}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this car?{" "}
            <strong className="text-destructive">
              This action can&apos;t be undone!
            </strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClick} variant="destructive" className="w-full">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export const CarTypeDeleteForm = ({ id }: { id?: string }) => {
  const carType = useGetCarTypeById(id);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  if (!id) return;
  const onClick = async () => {
    try {
      deleteCarType(parseFloat(id));
      toast({
        title: "Delete successful",
        description: `Car type with id :${id} successfuly deleted.`,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong.`,
      });
    }
  };
  if (!id) return;
  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-[30px] h-[30px] p-0">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Delete car type with id:{id}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this car type? All cars with this
            types will also be removed.
          </DialogDescription>
          {carType && (
            <DataTable
              data={[carType]}
              columns={Object.keys(carType).map((carTypeKey) => ({
                accessorKey: carTypeKey,
                header: carTypeKey,
              }))}
            />
          )}
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClick} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
