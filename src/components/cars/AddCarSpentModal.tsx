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
import { useState } from "react";
import { AddCarSpentForm } from "./AddCarSpentForm";

export function AddCarSpentModal({ carId }: { carId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const onSuccess = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add car spent</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car spent</DialogTitle>
          <DialogDescription>
            You can write your spent&apos;s on car there.
          </DialogDescription>
          <AddCarSpentForm carId={carId} onSuccess={onSuccess} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
