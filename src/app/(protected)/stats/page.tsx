import { CarTypesCount } from "@/components/tables/CarTypesCount";
import { CarsWithTotalTable } from "@/components/tables/CarsWithTotal";
import LinePlot from "@/components/ui/d3chart";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/services/getUser";
import {
  getCarSpentFromPrice,
  getCarsTypesCount,
  getCarsWithTotalSpent,
  getMileageByMonth,
} from "@/services/stats";
import { redirect } from "next/navigation";

const Statistic = async () => {
  const user = await getUser();
  if (!user) redirect("/auth");
  const mileageByMonth = await getMileageByMonth(user.userId);
  const carsWithTotalSpent = await getCarsWithTotalSpent(user.userId);
  const carTypesCount = await getCarsTypesCount();
  const carSpentFromPrice = await getCarSpentFromPrice();
  return (
    <section className="container mx-auto space-x-2">
      <h1 className="text-center text-[36px] font-medium">Statistics</h1>
      <div>
        <p>Mileage this month: {mileageByMonth}km</p>
      </div>
      <Separator className="my-4" />
      <div className="max-w-[800px]">
        Total spent&apos;s for each of your cars.
        <CarsWithTotalTable carsWithTotal={carsWithTotalSpent} />
      </div>
      <Separator className="my-4" />
      <div className="max-w-[800px]">
        Cars by popularity.
        <CarTypesCount carTypesCount={carTypesCount} />
      </div>
      <Separator className="my-4" />
      <div>
        <p>Car spent(in$) from base car price(in 1000$)</p>
        <LinePlot data={carSpentFromPrice} />
      </div>
    </section>
  );
};
export default Statistic;
