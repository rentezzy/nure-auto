import { UserTable } from "@/components/tables/UserTable";
import { PrismaService } from "@/services/Prisma";
export default async function Home() {
  const users = await PrismaService.getUsers();
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 pt-20">
        <UserTable users={users} />
      </section>
    </main>
  );
}
