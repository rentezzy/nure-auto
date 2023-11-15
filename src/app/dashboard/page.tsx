import { getUser } from "@/services/getUser";

const Dashboard = async () => {
  const user = await getUser();
  return <div>{user?.email}</div>;
};
export default Dashboard;
