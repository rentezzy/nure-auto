import { PrismaService } from "@/services/Prisma";
import { cookies } from "next/headers";
export async function GET(request: Request) {
  const email = cookies().get("auth2");
  if (!email)
    return Response.json(
      { error: "You must be logged in to access it!" },
      { status: 401 }
    );
  const user = await PrismaService.getUser(email.value);
  if (!user)
    return Response.json(
      { error: "This email doesn't exist." },
      { status: 401 }
    );
  return Response.json({ user });
}
export async function DELETE(request: Request) {
  cookies().delete("auth2");

  return Response.redirect("/auth");
}
