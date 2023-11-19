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
import { CarSpent } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { TableCell } from "../ui/table";
const carSpentTypes = {
  MAINTENANCE: "Maintenance",
  GASOLINE: "Gasoline",
  REPAIR: "Repair",
  INSURANCE: "Insurance",
  OTHER: "Other",
} as const;

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
  const spentAt = new Date(spent.date);
  const formatted = `${spentAt.getFullYear()}-${
    spentAt.getMonth() + 1
  }-${spentAt.getDate()}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car spent from: {formatted}</DialogTitle>
          <DialogDescription>Info about your spent.</DialogDescription>
          <div className="space-y-2">
            <div>
              Spent type: <p className="px-2">{carSpentTypes[spent.type]}</p>
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
