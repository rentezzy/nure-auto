import { CarType } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetCarTypes = (id?: number) => {
  const [carTypes, setCarTypes] = useState<CarType[] | null>(null);
  useEffect(() => {
    if (id === undefined || (id === -1 && carTypes === null)) {
      fetch("/api/car-type")
        .then((res) => res.json())
        .then((res) => setCarTypes(res.carTypes));
    } else {
      if (
        carTypes !== null &&
        id !== -1 &&
        carTypes.findIndex((item) => item.carTypeId === id) === -1
      ) {
        fetch("/api/car-type")
          .then((res) => res.json())
          .then((res) => setCarTypes(res.carTypes));
      }
    }
  }, [id, carTypes]);
  return carTypes;
};
