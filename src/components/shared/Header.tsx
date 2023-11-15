import { getUser } from "@/services/getUser";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export const Header = async () => {
  const user = await getUser();
  async function logout() {
    "use server";
    cookies().delete("auth2");
    redirect("/auth");
  }
  return (
    <header className="border-b">
      <div className="container mx-auto p-2 flex justify-end">
        <div className="flex gap-2 items-center">
          <Button variant="link" asChild>
            <Link href="/cabinet">{user?.email}</Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};
