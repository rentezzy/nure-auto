import { Input } from "@/components/ui/input";
import { useGetCarTypes } from "@/hooks/useGetCarTypesId";
import { useGetUsersId } from "@/hooks/useGetUsersId";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export const UserForm = ({ control }: { control: Control<any, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export const CarForm = ({ control }: { control: Control<any, any> }) => {
  const usersId = useGetUsersId();
  const carTypesId = useGetCarTypes();
  return (
    <>
      <FormField
        control={control}
        name="mileage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mileage</FormLabel>
            <FormControl>
              <Input
                placeholder="Mileage"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input
                placeholder="Year"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Price"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="buyAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Buy at</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      `${field.value.getFullYear()}-${
                        field.value.getMonth() + 1
                      }-${field.value.getDate()}`
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="userId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Id</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={`${field.value}`}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user id" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {usersId &&
                  usersId.map((userId) => (
                    <SelectItem key={userId.userId} value={`${userId.userId}`}>
                      {userId.userId}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="carTypeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Car type Id</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={`${field.value}`}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a car type id" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carTypesId &&
                  carTypesId.map((carTypeId) => (
                    <SelectItem
                      key={carTypeId.carTypeId}
                      value={`${carTypeId.carTypeId}`}
                    >
                      {carTypeId.carTypeId}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

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
            <SelectTrigger className="w-[40px]" />
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
            <SelectTrigger className="w-[40px]" />
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
export const CarTypeForm = ({ control }: { control: Control<any, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="brand"
        render={CarTypeBrandSelect}
      />
      <FormField
        control={control}
        name="model"
        render={CarTypeModelSelect}
      />
      <FormField
        control={control}
        name="beginYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Begin year</FormLabel>
            <FormControl>
              <Input
                placeholder="Year"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End year</FormLabel>
            <FormControl>
              <Input
                placeholder="Year"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="engine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Engine, L.</FormLabel>
            <FormControl>
              <Input
                placeholder="Engine"
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="gasoline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gasoline type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a gasoline type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {["D", "A92", "A95", "A98", "A100"].map((gasoline) => (
                  <SelectItem key={gasoline} value={gasoline}>
                    {gasoline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="transmission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Transmission type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a transmission type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {["Mechanical", "Automatic"].map((transmission) => (
                  <SelectItem key={transmission} value={transmission}>
                    {transmission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
