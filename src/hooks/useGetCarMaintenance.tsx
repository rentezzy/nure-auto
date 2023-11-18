import { useEffect, useState } from "react";

export const useGetMaintenanceByCarId = (carId?: number) => {
  const [maintenance, setMaintenance] = useState<
    { maintenanceId: number; condition: number }[] | null
  >(null);
  useEffect(() => {
    fetch(`/api/maintenance/${carId}`)
      .then((res) => res.json())
      .then((res) => setMaintenance(res.maintenance));
  }, [carId]);
  return maintenance;
};
