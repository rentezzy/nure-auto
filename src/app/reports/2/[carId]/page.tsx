import RoadAccidentChart from "@/components/stats/RoadAccidentChart";
import { formatDate } from "@/lib/utils";
import { PrismaService } from "@/services/Prisma";

export default async function Page({ params }: { params: { carId: string } }) {
  const stats = (await PrismaService.prismClient
    .$queryRaw`select mileage, count(car_spent_id) from car 
  join car_spent on car_spent.car_id = car.car_id
  where car_type_id = ${parseInt(params.carId)} and car_spent.type = 'REPAIR'
  group by mileage;`) as { mileage: number; count: bigint }[];
  const carName = await PrismaService.getCarType(parseInt(params.carId));
  const toDraw = stats.map((el) => [el.mileage, parseInt(el.count.toString())]);
  return (
    <section className="container mx-auto space-x-2 flex flex-col items-center">
      <h1 className="text-center text-[36px] font-medium">
        Road accident&apos;s from mileage report
      </h1>
      <RoadAccidentChart
        data={toDraw as [number, number][]}
        label={`${carName?.brand} ${carName?.model}`}
      />
      <div className="text-end p-4 self-end">{formatDate(new Date())}</div>
    </section>
  );
}
