"use client";
import { deleteNotification } from "@/services/server-actions/deleteRow";
import { Notification } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
export const NotificationCard = ({
  notification,
}: {
  notification: Notification;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const onClick = async () => {
    try {
      deleteNotification(notification.notificationId);
      toast({
        title: "Delete successful",
        description: "Notification successfully deleted.",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong.`,
      });
    }
  };
  return (
    <div className="w-full border rounded-md p-4 relative">
      <h4 className="font-medium">{notification.title}</h4>
      <p className="px-2">{notification.text}</p>
      <Button
        variant="ghost"
        className="w-[30px] h-[30px] p-0 absolute top-2 right-2"
        onClick={onClick}
      >
        <X />
      </Button>
    </div>
  );
};
