import { Toaster } from "@/shared/ui";
import { Footer, Header } from "@/widgets";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
}
