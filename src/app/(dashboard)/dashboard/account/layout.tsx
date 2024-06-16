import { Container, Heading, Section } from "@/shared/ui";
import { AccountSidebar } from "./_ui";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Container>
        <Heading className="mb-6 md:mb-8" tag="h1">
          Settings
        </Heading>

        <div className="grid gap-5 grid-cols-12">
          <AccountSidebar />
          {children}
        </div>
      </Container>
    </Section>
  );
}
