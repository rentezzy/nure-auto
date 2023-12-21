import { Download } from "@/components/reports/Download";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Download />
      <div id="toPrint">{children}</div>
    </div>
  );
}
