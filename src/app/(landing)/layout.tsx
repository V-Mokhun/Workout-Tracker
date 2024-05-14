import { Footer } from "@/widgets";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
