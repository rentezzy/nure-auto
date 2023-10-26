import { PrismaService } from "@/services/Prisma";
import { User } from "@prisma/client";
import { DataTable } from "../ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userId",
    header: "user_id",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "password",
    header: "password",
  },
];

export const UserTable = async () => {
  const data = await PrismaService.getUsers();
  return <DataTable columns={columns} data={data} />;
};
