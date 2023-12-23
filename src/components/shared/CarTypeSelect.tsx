import { useGetCarTypes } from "@/hooks/useGetCarTypesId";
import { CarType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Control } from "react-hook-form";
import { CarTypeDataTable } from "../ui/carTypeDataTable";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const columns: ColumnDef<CarType>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const id: string = row.getValue("carTypeId");
      return (
        <RadioGroup>
          <RadioGroupItem
            checked={row.getIsSelected()}
            onClick={() => row.toggleSelected()}
            value={id}
            id={id}
          />
        </RadioGroup>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "carTypeId",
    id: "carTypeId",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "engine",
    header: "Engine, L.",
  },
  {
    accessorKey: "gasoline",
    header: "Gasoline type",
  },
  {
    accessorKey: "transmission",
    header: "Transmission type",
  },
  {
    accessorKey: "beginYear",
    header: "Year of release",
  },
  {
    accessorKey: "endYear",
    header: "Year of close",
  },
];

export const CarTypeSelect = ({
  control,
  carTypeId,
}: {
  control: Control<any, any>;
  carTypeId: number;
}) => {
  const carTypes = useGetCarTypes(carTypeId)?.reverse();
  return (
    <FormField
      control={control}
      name="carTypeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select which car you are own</FormLabel>
          <FormControl>
            {carTypes && (
              <CarTypeDataTable
                data={carTypes}
                columns={columns}
                onChange={field.onChange}
                selected={field.value}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
