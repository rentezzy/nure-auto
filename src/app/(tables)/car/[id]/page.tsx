import { CarTable } from "@/components/tables/CarTable";
import { CarTypeTable } from "@/components/tables/CarTypeTable";
import { UserTable } from "@/components/tables/UserTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PrismaService } from "@/services/Prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const car = await PrismaService.prismClient.car.findUnique({
    where: {
      carId: parseInt(params.id),
    },
  });
  if (!car) notFound();
  const user = await PrismaService.prismClient.user.findUnique({
    where: {
      userId: car.userId,
    },
  });
  const carType = await PrismaService.prismClient.carType.findUnique({
    where: {
      carTypeId: car.carTypeId,
    },
  });
  if (!user || !carType) notFound();
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 space-y-8">
        <Card className="border-green-400">
          <CardHeader>
            <h1>Car</h1>
          </CardHeader>
          <CardContent>
            <CarTable cars={[car]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h1>Car Type</h1>
          </CardHeader>
          <CardContent>
            <CarTypeTable carTypes={[carType]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h1>User</h1>
          </CardHeader>
          <CardContent>
            <UserTable users={[user]} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
