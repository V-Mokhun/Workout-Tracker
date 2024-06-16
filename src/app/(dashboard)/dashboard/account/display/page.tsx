import { Heading } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { DisplayForm } from "./_ui";

const Page = async () => {
  const session = await getSession();

  if (!session) notFound();

  const units = session.user?.user_metadata?.units ?? "metric";

  return (
    <div className="col-span-9">
      <Heading className="mb-6">Display</Heading>
      <DisplayForm units={units} />
    </div>
  );
};

export default Page;
