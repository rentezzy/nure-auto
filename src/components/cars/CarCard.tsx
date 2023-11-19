import { Car, CarType } from "@prisma/client";
import { Car as CarIcon } from "lucide-react";
import Image from "next/image";
import car_placeholder from "../../../public/car-placeholder.png";
import { CarDeleteForm } from "../shared/DeleteElement";
import { CarEditForm } from "../shared/EditElement";
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
export const CarCardBig = ({ car }: { car: Car & { carType: CarType } }) => {
  const name = `${car.carType.brand} ${car.carType.model}`;
  return (
    <>
      <div className="justify-center flex items-center gap-2">
        <h1 className="text-center text-[36px] font-medium">{name}</h1>
        <CarEditForm car={car} />
        <CarDeleteForm id={car.carId} name={name} />
      </div>
      <div className="grid grid-cols-4 grid-rows-4 w-full border-b">
        <div className="text-right">
          <p className="text-[24px]">Brand</p>
          <p className="px-2 text-[16px]">{car.carType.brand}</p>
        </div>
        <div className="row-span-4 col-span-2 flex justify-center items-center">
          <Image alt="CAR" src={car_placeholder} height={300} />
        </div>
        <div>
          <p className="text-[24px]">Engine</p>
          <p className="px-2 text-[16px]">{car.carType.engine}L</p>
        </div>
        <div className="text-right">
          <p className="text-[24px]">Model</p>
          <p className="px-2 text-[16px]">{car.carType.model}</p>
        </div>
        <div>
          <p className="text-[24px]">Gasoline</p>
          <p className="px-2 text-[16px]">{car.carType.gasoline}</p>
        </div>
        <div className="text-right">
          <p className="text-[24px]">Year</p>
          <p className="px-2 text-[16px]">{car.year}</p>
        </div>
        <div>
          <p className="text-[24px]">Transmission</p>
          <p className="px-2 text-[16px]">{car.carType.transmission}</p>
        </div>
        <div className="text-right">
          <p className="text-[24px]">Mileage</p>
          <p className="px-2 text-[16px]">{car.mileage}km</p>
        </div>
        <div>
          <p className="text-[24px]">Model year</p>
          <p className="px-2 text-[16px]">{`${car.carType.beginYear} - ${car.carType.endYear}`}</p>
        </div>
      </div>
    </>
  );
};
