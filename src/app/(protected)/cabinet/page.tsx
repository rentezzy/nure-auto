import { NotificationCard } from "@/components/cabinet/NotificationCard";
import { PrismaService } from "@/services/Prisma";
import { getUser } from "@/services/getUser";
import { notFound } from "next/navigation";

const Cabinet = async () => {
  const user = await getUser();
  if (!user) notFound();
  const notifications = await PrismaService.prismClient.notification.findMany({
    where: {
      userId: user.userId,
    },
  });
  return (
    <div className="container py-4">
      <h1 className="text-center text-[48px] font-medium m-2">Cabinet</h1>
      <div className="space-y-2">
        {notifications.length < 1
          ? "Nothing here yet!"
          : notifications.map((notification) => (
              <NotificationCard
                key={notification.notificationId}
                notification={notification}
              />
            ))}
      </div>
    </div>
  );
};
export default Cabinet;
