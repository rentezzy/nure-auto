import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { RawSqlEditor } from "./RawSql";

export const RawSql = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Raw Sql</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader className="">
          <DialogTitle>Raw sql editor</DialogTitle>
        </DialogHeader>
        <RawSqlEditor />
      </DialogContent>
    </Dialog>
  );
};
