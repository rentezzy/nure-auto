import { PrismaService } from "@/services/Prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password)
    return Response.json({ error: "You must specify email and password" });
  try {
    const user = await PrismaService.addUser({ email, password });

    cookies().set("auth2", String(user.userId));

    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: "This email already exist!" });
  }
}
