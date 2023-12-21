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
import { getCurrentWeekAndYear } from "@/lib/utils";
import { Usage } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddCarWeeklySpentForm } from "./AddWeeklySpentForm";

export function AddWeeklySpentModal({
  carId,
  carUsage,
}: {
  carId: number;
  carUsage: Usage[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onSuccess = () => setIsOpen(false);

  const { year, week } = getCurrentWeekAndYear();
  const isUsageNoticed = carUsage.filter(
    (usage) => usage.year === year && usage.weekNumber === week
  );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!!isUsageNoticed.length}>
          <Plus />
          Add weekly spent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car spent</DialogTitle>
          <DialogDescription>
            You can write your spent&apos;s on car there.
          </DialogDescription>
          <AddCarWeeklySpentForm carId={carId} onSuccess={onSuccess} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
