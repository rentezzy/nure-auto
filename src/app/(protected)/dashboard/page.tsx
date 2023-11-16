import { CarCard } from "@/components/cars/CarCard";
import { Button } from "@/components/ui/button";
import { PrismaService } from "@/services/Prisma";
import { getUser } from "@/services/getUser";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await getUser();
  if (!user) redirect("/auth");
  const cars = await PrismaService.getCarsByUserId(user.userId);
  return (
    <section className="container mx-auto space-x-2">
      <div className="w-full border-b py-4">
        <Button variant="link" asChild>
          <Link href="/create-car">
            <Plus />
            Add new car
          </Link>
        </Button>
      </div>
      <div>
        {cars.length === 0 ? (
          <p>No cars yet</p>
        ) : (
          cars.map((car) => <CarCard car={car} key={car.carId} />)
        )}
      </div>
    </section>
  );
};
export default Dashboard;