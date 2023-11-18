import { AddCarSpentModal } from "@/components/cars/AddCarSpentModal";
import { AddWeeklySpentModal } from "@/components/cars/AddWeeklySpentModal";
import { CarCardBig } from "@/components/cars/CarCard";
import { PrismaService } from "@/services/Prisma";
import { getUser } from "@/services/getUser";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser();
  const car = await PrismaService.getCar(parseInt(params.id));
  if (!user || !car || user.userId !== car.userId) notFound();

  return (
    <div className="container py-4">
      <CarCardBig car={car} />
      <div className="p-4 flex gap-4 justify-end items-center">
        <AddCarSpentModal carId={parseInt(params.id)} />
        <AddWeeklySpentModal carId={parseInt(params.id)} carUsage={car.usage} />
      </div>
    </div>
  );
}
