"use client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { UserEditForm } from "../shared/EditForm";
import { DataTable } from "../ui/dataTable";
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
  {
    id: "edit-buttons",

    cell(props) {
      const id: string | undefined = props.row.getValue("userId");

      return (
        <div className="flex justify-end">
          <UserEditForm id={id} />
        </div>
      );
    },
  },
];

export const UserTable = ({ users }: { users: User[] }) => {
  return <DataTable columns={columns} data={users} />;
};
