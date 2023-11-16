import { Car, CarType } from "@prisma/client";
import { Car as CarIcon } from "lucide-react";
import { TableCell } from "../ui/table";

export const CarCard = ({ car }: { car: Car & { carType: CarType } }) => {
  const buyAt = new Date(car.buyAt);
  const formatted = `${buyAt.getFullYear()}-${
    buyAt.getMonth() + 1
  }-${buyAt.getDate()}`;
  return (
    <>
      <TableCell className="flex items-center gap-2">
        <CarIcon size="30" />
        <div>
          <p className="whitespace-nowrap">{`${car.carType.brand} ${car.carType.model}`}</p>
        </div>
      </TableCell>
      <TableCell className="flex-grow-1 w-full flex justify-end">
        <div className="min-w-[200px]">
          <p>Mileage: {car.mileage}km</p>
          <p>Year: {car.year}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="min-w-[200px]">
          <p>Bought at: {formatted}</p>
          <p>Base price: {car.price}$</p>
        </div>
      </TableCell>
    </>
  );
};
