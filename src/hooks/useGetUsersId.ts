import { useEffect, useState } from "react";

export const useGetUsersId = () => {
  const [usersId, setUsersId] = useState<{ userId: number }[] | null>(null);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => setUsersId(res.usersId));
  }, []);
  return usersId;
};
