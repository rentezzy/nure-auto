"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { DataTablePagination } from "./table-elements";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onChange: (value: number | null) => void;
  selected: number;
}

export function CarTypeDataTable<TData, TValue>({
  columns,
  data,
  onChange,
  selected,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      rowSelection,
    },
    initialState: {
      columnVisibility: {
        carTypeId: false,
      },
    },
  });
  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (Array.isArray(selectedRows) && selectedRows.length === 1) {
      const selectedId: number = selectedRows[0].getValue("carTypeId");
      onChange(selectedId);
      return;
    }
    onChange(-1);
  }, [rowSelection]);

  useEffect(() => {
    if (selected === -1) {
      setRowSelection({});
    }
  }, [selected]);
  return (
    <div>
      <div className="rounded-md border flex">
        <div className="border-r p-4 basis-1/4 space-y-2">
          <h4 className="text-center">Filters</h4>
          <Label>Brand:</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("brand")?.setFilterValue(value)
              }
              value={
                (table.getColumn("brand")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a car brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    table.getColumn("brand")?.getFacetedUniqueValues().keys() ||
                      []
                  ).map((brand) => {
                    return (
                      <SelectItem value={brand} key={brand}>
                        {brand}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="reset"
              variant="ghost"
              size="icon"
              onClick={() => {
                table.getColumn("brand")?.setFilterValue(null);
              }}
            >
              <X />
            </Button>
          </div>
          <Label>Model:</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("model")?.setFilterValue(value)
              }
              value={
                (table.getColumn("model")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a car model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    table.getColumn("model")?.getFacetedUniqueValues().keys() ||
                      []
                  ).map((model) => {
                    return (
                      <SelectItem value={model} key={model}>
                        {model}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="reset"
              variant="ghost"
              size="icon"
              onClick={() => {
                table.getColumn("model")?.setFilterValue(null);
              }}
            >
              <X />
            </Button>
          </div>
          <Label>Gasoline:</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("gasoline")?.setFilterValue(value)
              }
              value={
                (table.getColumn("gasoline")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gasoline type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    table
                      .getColumn("gasoline")
                      ?.getFacetedUniqueValues()
                      .keys() || []
                  ).map((gasoline) => {
                    return (
                      <SelectItem value={gasoline} key={gasoline}>
                        {gasoline}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="reset"
              variant="ghost"
              size="icon"
              onClick={() => {
                table.getColumn("gasoline")?.setFilterValue(null);
              }}
            >
              <X />
            </Button>
          </div>
          <Label>Transmission:</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("transmission")?.setFilterValue(value)
              }
              value={
                (table.getColumn("transmission")?.getFilterValue() as string) ??
                ""
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transmission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    table
                      .getColumn("transmission")
                      ?.getFacetedUniqueValues()
                      .keys() || []
                  ).map((transmission) => {
                    return (
                      <SelectItem value={transmission} key={transmission}>
                        {transmission}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="reset"
              variant="ghost"
              size="icon"
              onClick={() => {
                table.getColumn("transmission")?.setFilterValue(null);
              }}
            >
              <X />
            </Button>
          </div>
          <Label>Years of release:</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min={Number(
                table.getColumn("beginYear")?.getFacetedMinMaxValues()?.[0] ??
                  ""
              )}
              max={Number(
                table.getColumn("beginYear")?.getFacetedMinMaxValues()?.[1] ??
                  ""
              )}
              value={
                (
                  table.getColumn("beginYear")?.getFilterValue() as [
                    number,
                    number
                  ]
                )?.[0] ||
                table.getColumn("beginYear")?.getFacetedMinMaxValues()?.[0] ||
                "1990"
              }
              onChange={(value) =>
                table
                  .getColumn("beginYear")
                  ?.setFilterValue([
                    value.target.value,
                    table.getColumn("beginYear")?.getFacetedMinMaxValues()?.[1],
                  ])
              }
            ></Input>
            <Input
              type="number"
              min={Number(
                table.getColumn("endYear")?.getFacetedMinMaxValues()?.[0] ?? ""
              )}
              max={Number(
                table.getColumn("endYear")?.getFacetedMinMaxValues()?.[1] ?? ""
              )}
              value={
                (
                  table.getColumn("endYear")?.getFilterValue() as [
                    number,
                    number
                  ]
                )?.[1] ||
                table.getColumn("endYear")?.getFacetedMinMaxValues()?.[1] ||
                "2023"
              }
              onChange={(value) =>
                table
                  .getColumn("endYear")
                  ?.setFilterValue([
                    table.getColumn("endYear")?.getFacetedMinMaxValues()?.[0],
                    value.target.value,
                  ])
              }
            ></Input>
          </div>
        </div>
        <Table className="basis-3/4">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="w-2" />
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
      {data.length > 10 && (
        <div className="mt-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
