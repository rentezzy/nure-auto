import { useGetCarTypes } from "@/hooks/useGetCarTypesId";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CarTypeBrandSelect = <T extends string>({
  field,
}: {
  field: ControllerRenderProps<any, T>;
}) => {
  const carTypes = useGetCarTypes();
  return (
    <FormItem>
      <FormLabel>Car brand</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <div className="flex gap-2">
            <Input
              onChange={field.onChange}
              value={field.value}
              placeholder="Brand"
            />
            <SelectTrigger className="w-[40px]">
              <SelectValue className="w-[40px]" />
            </SelectTrigger>
          </div>
        </FormControl>
        <SelectContent>
          {carTypes &&
            Array.from(new Set(carTypes.map((carType) => carType.brand))).map(
              (brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              )
            )}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
export const CarTypeModelSelect = <T extends string>({
  field,
}: {
  field: ControllerRenderProps<any, T>;
}) => {
  const carTypes = useGetCarTypes();
  return (
    <FormItem>
      <FormLabel>Car model</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <div className="flex gap-2">
            <Input
              onChange={field.onChange}
              value={field.value}
              placeholder="Model"
            />
            <SelectTrigger className="w-[40px]">
              <SelectValue className="w-[40px]" />
            </SelectTrigger>
          </div>
        </FormControl>
        <SelectContent>
          {carTypes &&
            Array.from(new Set(carTypes.map((carType) => carType.model))).map(
              (model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              )
            )}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
