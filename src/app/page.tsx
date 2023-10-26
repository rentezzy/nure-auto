import { UserTable } from "@/components/tables/UserTable";

export default async function Home() {
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2 pt-20">
        <UserTable />
      </section>
    </main>
  );
}
