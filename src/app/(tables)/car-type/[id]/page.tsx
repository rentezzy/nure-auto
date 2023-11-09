import { CarTable } from "@/components/tables/CarTable";
import { CarTypeTable } from "@/components/tables/CarTypeTable";
import { UserTable } from "@/components/tables/UserTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PrismaService } from "@/services/Prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const carType = await PrismaService.prismClient.carType.findUnique({
    where: {
      carTypeId: parseInt(params.id),
    },
  });
  if (!carType) notFound();
  const cars = await PrismaService.prismClient.car.findMany({
    where: {
      carTypeId: carType.carTypeId,
    },
  });

  const usersId = cars.map((car) => car.userId);
  const users = await PrismaService.prismClient.user.findMany({
    where: {
      userId: {
        in: usersId,
      },
    },
  });
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 space-y-8">
        <Card>
          <CardHeader className="border-green-400">
            <h1>Car Type</h1>
          </CardHeader>
          <CardContent>
            <CarTypeTable carTypes={[carType]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h1>Cars Table</h1>
          </CardHeader>
          <CardContent>
            <CarTable cars={cars} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h1>Users Table</h1>
          </CardHeader>
          <CardContent>
            <UserTable users={users} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
