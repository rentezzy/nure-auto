import { PrismaService } from "@/services/Prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await PrismaService.prismClient.user.findUnique({
    where: {
      userId: parseInt(params.id),
    },
  });
  return Response.json({ user });
}
