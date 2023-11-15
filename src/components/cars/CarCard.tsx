import { PrismaService } from "@/services/Prisma";
import { Car } from "@prisma/client";
import { Car as CarIcon } from "lucide-react";
import Link from "next/link";

export const CarCard = async ({ car }: { car: Car }) => {
  const carType = await PrismaService.getCarType(car.carTypeId);
  if (!carType) return <div>Something went wrong with this car.</div>;
  const buyAt = new Date(car.buyAt);
  const formatted = `${buyAt.getFullYear()}-${
    buyAt.getMonth() + 1
  }-${buyAt.getDate()}`;
  return (
    <Link href={`/my-car/${car.carId}`}>
      <div className="flex w-full gap-2 border-b p-2 items-center hover:scale-[1.001] transition-all">
        <CarIcon size="30" />
        <div>
          <p className="whitespace-nowrap">{`${carType.brand} ${carType.model}`}</p>
        </div>
        <div className="flex-grow-1 w-full flex justify-end gap-4">
          <div className="min-w-[200px]">
            <p>Year: {car.year}</p>
            <p>Base price: {car.price}$</p>
          </div>
          <div className="min-w-[200px]">
            <p>Mileage: {car.mileage}km</p>
            <p>Bought at: {formatted}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
