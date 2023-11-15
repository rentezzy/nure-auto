import { Header } from "@/components/shared/Header";
import { UserProvider } from "@/services/UserProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <UserProvider>{children}</UserProvider>
    </>
  );
}
