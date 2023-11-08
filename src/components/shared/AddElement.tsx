import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AddCarForm, AddCarTypeForm, AddUserForm } from "./AddElementForms";

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
          <CardContent className="p-4">
            <AddUserForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="car">
        <Card>
          <CardContent className="p-4">
            <AddCarForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="carType">
        <Card>
          <CardContent className="p-4">
            <AddCarTypeForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
