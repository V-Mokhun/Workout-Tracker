import { DASHBOARD_ROUTE, HOME_ROUTE } from "@/shared/consts";
import { Button, Container, Heading, buttonVariants } from "@/shared/ui";
import { Footer, Header } from "@/widgets";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

const NotFound = async () => {
  const session = await getSession();

  return (
    <>
      {session && <Header />}
      <main className="flex-auto">
        <div className="py-20">
          <Container>
            <Heading tag="h1">404</Heading>
            <Heading className="mb-6" tag="h2">Oops! Page not found.</Heading>
            <Link
              href={session ? DASHBOARD_ROUTE : HOME_ROUTE}
              className={buttonVariants()}
            >
              Go Back
            </Link>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
