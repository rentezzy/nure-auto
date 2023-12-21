"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const SelectReport = ({ carTypes }: { carTypes: CarType[] }) => {
  const [selected, onSelect] = useState<null | string>(null);
  const router = useRouter();
  const onSubmit = () => selected && router.push(`/reports/2/${selected}`);
  return (
    <div className="flex gap-2 items-end">
      <div>
        <Label>Car type</Label>
        <Select name="carType" onValueChange={onSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a car type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {carTypes.length === 0
                  ? "No registered cars with road accident's"
                  : "Cars"}
              </SelectLabel>

              {carTypes.map((carType) => (
                <SelectItem
                  key={carType.carTypeId}
                  value={String(carType.carTypeId)}
                >
                  {`${carType.brand} ${carType.model}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSubmit}>Search</Button>
    </div>
  );
};
