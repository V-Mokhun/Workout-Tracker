import { Heading } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { DisplayForm } from "./_ui";

const Page = async () => {
  const session = await getSession();

  if (!session) notFound();

  const units = session.user?.user_metadata?.units ?? "metric";

  return (
    <div className="col-span-9 animate-fadeIn">
      <Heading className="mb-6">Display Settings</Heading>
      <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
        <p className="text-gray-600 mb-6">
          Customize how information is displayed in your account.
        </p>
        <DisplayForm units={units} />
      </div>
    </div>
  );
};

export default Page;
