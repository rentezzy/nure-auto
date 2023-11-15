import { RawSql } from "@/components/shared/RawSqlDialog";
import { CarTable } from "@/components/tables/CarTable";
import { CarTypeTable } from "@/components/tables/CarTypeTable";
import { UserTable } from "@/components/tables/UserTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PrismaService } from "@/services/Prisma";
export default async function Home() {
  const users = await PrismaService.getUsers();
  const cars = await PrismaService.getCars();
  const carTypes = await PrismaService.getCarTypes();
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 space-y-8">
        <Card>
          <CardHeader>
            <h1>Users Table</h1>
          </CardHeader>
          <CardContent>
            <UserTable users={users} />
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
        <RawSql />
      </section>
    </main>
  );
}
