"use client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Trash } from "lucide-react";
import Link from "next/link";
import { UserEditForm } from "../shared/EditElement";
import { Button } from "../ui/button";
import { DataTable } from "../ui/dataTable";
import { UserDeleteForm } from "../shared/DeleteElement";
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
        <div className="flex justify-end items-center gap-2">
          <UserEditForm id={id} />
          <UserDeleteForm id={id} />
          <Button variant="link" asChild>
            <Link href={`/user/${id}`}>
              <ChevronRight />
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const UserTable = ({ users }: { users: User[] }) => {
  return <DataTable columns={columns} data={users} />;
};
