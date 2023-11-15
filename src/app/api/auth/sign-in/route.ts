import { PrismaService } from "@/services/Prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password)
    return Response.json({ error: "You must specify email and password" });
  const user = await PrismaService.getUserByEmail(email);
  if (!user) return Response.json({ error: "This user doesn't exist" });
  if (user.password !== password)
    return Response.json({ error: "Wrong password." });
  cookies().set("auth2", String(user.userId));

  return Response.json({ user });
}
