import { Car, CarType, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetUserById = (id?: string) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);
  return user;
};
export const useGetCarById = (id?: string) => {
  const [car, setCar] = useState<Car | null>(null);
  useEffect(() => {
    fetch(`/api/car/${id}`)
      .then((res) => res.json())
      .then((res) => setCar(res.car));
  }, []);
  return car;
};
export const useGetCarTypeById = (id?: string) => {
  const [carType, setCarType] = useState<CarType | null>(null);
  useEffect(() => {
    fetch(`/api/car-type/${id}`)
      .then((res) => res.json())
      .then((res) => setCarType(res.carType));
  }, []);
  return carType;
};
