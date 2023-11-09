import { CarTable } from "@/components/tables/CarTable";
import { CarTypeTable } from "@/components/tables/CarTypeTable";
import { UserTable } from "@/components/tables/UserTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PrismaService } from "@/services/Prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await PrismaService.prismClient.user.findUnique({
    where: {
      userId: parseInt(params.id),
    },
  });
  if (!user) return notFound();
  const cars = await PrismaService.prismClient.car.findMany({
    where: {
      userId: user.userId,
    },
  });
  const carTypesId = cars.map((car) => car.carTypeId);
  const carTypes = await PrismaService.prismClient.carType.findMany({
    where: {
      carTypeId: {
        in: carTypesId,
      },
    },
  });
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 space-y-8">
        <Card className="border-green-400">
          <CardHeader>
            <h1>Users Table</h1>
          </CardHeader>
          <CardContent>
            <UserTable users={[user]} />
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
            <h1>Car Types Table</h1>
          </CardHeader>
          <CardContent>
            <CarTypeTable carTypes={carTypes} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
