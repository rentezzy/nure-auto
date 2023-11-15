import { cookies } from "next/headers";
import { PrismaService } from "./Prisma";
export const getUser = async () => {
  const uId = cookies().get("auth2");
  if (!uId) return;
  const user = await PrismaService.getUser(parseInt(uId.value));
  return user;
};
