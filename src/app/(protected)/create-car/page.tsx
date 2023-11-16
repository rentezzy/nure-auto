import { CreateCarForm } from "@/components/forms/CreateCarForm";
import { getUser } from "@/services/getUser";
import { redirect } from "next/navigation";

const CreateCar = async () => {
  const user = await getUser();
  if (!user) redirect("/auth");
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-lg text-center">Here you can add your own car!</h1>
      <CreateCarForm uid={user.userId} />
    </section>
  );
};

export default CreateCar;
