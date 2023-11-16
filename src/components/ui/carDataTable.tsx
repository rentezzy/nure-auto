"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car, CarType } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CarCard } from "../cars/CarCard";
import { Button } from "./button";
import { Input } from "./input";

const columns: ColumnDef<Car & { carType: CarType }>[] = [
  {
    accessorFn: (row) => `${row.carType.brand} ${row.carType.model}`,
    id: "brandModel",
  },
  {
    accessorKey: "year",
    id: "year",
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mileage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "buyAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bought At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
type CarWithCarType = Car & { carType: CarType };

interface DataTableProps<TData, TValue> {
  data: CarWithCarType[];
}

export function CarDataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      columnVisibility: {
        brandModel: false,
        year: false,
      },
    },
  });
  return (
    <div>
      <div>
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder="Filter by name..."
            value={
              (table.getColumn("brandModel")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("brandModel")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-2 items-center">
            <Label>From:</Label>
            <Input
              type="number"
              min={Number(
                table.getColumn("year")?.getFacetedMinMaxValues()?.[0] ?? ""
              )}
              max={Number(
                table.getColumn("year")?.getFacetedMinMaxValues()?.[1] ?? ""
              )}
              value={
                (
                  table.getColumn("year")?.getFilterValue() as [number, number]
                )?.[0] ||
                table.getColumn("year")?.getFacetedMinMaxValues()?.[0] ||
                "1990"
              }
              onChange={(value) =>
                table
                  .getColumn("year")
                  ?.setFilterValue((old: [number, number]) => [
                    value.target.value,
                    old
                      ? old[1]
                      : table.getColumn("year")?.getFacetedMinMaxValues()?.[1],
                  ])
              }
            ></Input>
            <Label>To:</Label>
            <Input
              type="number"
              min={Number(
                table.getColumn("year")?.getFacetedMinMaxValues()?.[0] ?? ""
              )}
              max={Number(
                table.getColumn("year")?.getFacetedMinMaxValues()?.[1] ?? ""
              )}
              value={
                (
                  table.getColumn("year")?.getFilterValue() as [number, number]
                )?.[1] ||
                table.getColumn("year")?.getFacetedMinMaxValues()?.[1] ||
                "2023"
              }
              onChange={(value) =>
                table
                  .getColumn("year")
                  ?.setFilterValue((old: [number, number]) => [
                    old
                      ? old[0]
                      : table.getColumn("year")?.getFacetedMinMaxValues()?.[0],
                    value.target.value,
                  ])
              }
            ></Input>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex justify-end items-center gap-20 pr-24"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex items-center justify-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().flatRows.map(({ id, original }) => (
                <TableRow
                  key={id}
                  className="flex w-full gap-2 p-2 items-center transition-all hover:cursor-pointer"
                  onClick={() => {
                    router.push(`/my-car/${original.carId}`);
                  }}
                >
                  <CarCard car={original} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* {data.length > 1 && (
        <div className="mt-2">
          <DataTablePagination table={table} />
        </div>
      )} */}
    </div>
  );
}
