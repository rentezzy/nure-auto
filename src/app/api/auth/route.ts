import { PrismaService } from "@/services/Prisma";
import { cookies } from "next/headers";
export async function GET() {
  const uId = cookies().get("auth2");
  if (!uId)
    return Response.json(
      { error: "You must be logged in to access it!" },
      { status: 401 }
    );
  const user = await PrismaService.getUser(parseInt(uId.value));
  if (!user)
    return Response.json(
      { error: "This user doesn't exist." },
      { status: 401 }
    );
  return Response.json({ user });
}
export async function DELETE() {
  cookies().delete("auth2");

  return Response.redirect("/auth");
}
