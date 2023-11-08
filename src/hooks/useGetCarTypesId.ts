import { CarType } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetCarTypes = () => {
  const [carTypes, setCarTypes] = useState<CarType[] | null>(null);
  useEffect(() => {
    fetch("/api/car-type")
      .then((res) => res.json())
      .then((res) => setCarTypes(res.carTypes));
  }, []);
  return carTypes;
};
