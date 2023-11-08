"use client";
import { CarType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CarTypeEditForm } from "../shared/EditForm";
import { DataTable } from "../ui/dataTable";
const columns: ColumnDef<CarType>[] = [
  {
    accessorKey: "carTypeId",
    header: "car_type_id",
  },
  {
    accessorKey: "brand",
    header: "brand",
  },
  {
    accessorKey: "model",
    header: "model",
  },
  {
    accessorKey: "beginYear",
    header: "begin_year",
  },
  {
    accessorKey: "endYear",
    header: "end_year",
  },
  {
    accessorKey: "engine",
    header: "engine",
  },
  {
    accessorKey: "gasoline",
    header: "gasoline",
  },
  {
    accessorKey: "transmission",
    header: "transmission",
  },
  {
    id: "edit-buttons",
    cell(props) {
      const id: string | undefined = props.row.getValue("carTypeId");

      return (
        <div className="flex justify-end">
          <CarTypeEditForm id={id} />
        </div>
      );
    },
  },
];

export const CarTypeTable = ({ carTypes }: { carTypes: CarType[] }) => {
  return <DataTable columns={columns} data={carTypes} />;
};
