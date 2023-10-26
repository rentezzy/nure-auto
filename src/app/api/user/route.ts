import { PrismaService } from "@/services/Prisma";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  if (!email || !password)
    return Response.json({ message: "You need to specify email and password" });
  const user = await PrismaService.addUser(email, password);
  return Response.json({ user });
};
