import { UserProvider } from "@/services/UserProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
