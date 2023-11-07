import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddUserForm } from "./AddElementForms";
export const AddElement = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[20px] h-[20px] p-0" variant="ghost">
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new row to table.</DialogTitle>
          <DialogDescription>
            Choose the table where you want to add value.
          </DialogDescription>
        </DialogHeader>
        <AddTabs />
      </DialogContent>
    </Dialog>
  );
};

function AddTabs() {
  return (
    <Tabs defaultValue="user">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="car">Car</TabsTrigger>
        <TabsTrigger value="carType">Car type</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <AddUserForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
