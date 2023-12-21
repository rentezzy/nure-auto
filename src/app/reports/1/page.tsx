import { SaveReports } from "@/components/reports/FirstReport";
import { formatDate } from "@/lib/utils";
import { getCarTypeSpent } from "@/services/stats";

const Report = async () => {
  const carSpentByCarType = await getCarTypeSpent();
  return (
    <section className="container mx-auto space-x-2">
      <h1 className="text-center text-[36px] font-medium py-4">
        Spending&apos;s for every car type report
      </h1>
      <SaveReports carSpentByCarType={carSpentByCarType} />
      <div className="text-end p-4">{formatDate(new Date())}</div>
    </section>
  );
};
export default Report;
