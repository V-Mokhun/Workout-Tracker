"use server";

import { db } from "@/db/database";
import { DisplayFormState } from "./display-form";
import { user as dbUser } from "@/db";
import { eq } from "drizzle-orm";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { DisplayFormSchema, displayFormSchema } from "./display-form-model";

export async function updateAccountDisplay(
  values: DisplayFormSchema
): Promise<DisplayFormState> {
  try {
    const parsed = displayFormSchema.safeParse(values);

    if (!parsed.success) {
      return {
        message: "Invalid form values",
        isError: true,
      };
    }

    const session = await getSession();
    if (!session) {
      return {
        message: "Session not found.",
        isError: true,
      };
    }
    const userId = session.user.sub;

    const user = await db.query.user.findFirst({
      where: eq(dbUser.id, userId),
    });
    if (!user) {
      return {
        message: "User not found.",
        isError: true,
      };
    }

    const apiResponse = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MGMT_API_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          user_metadata: {
            units: values.units,
          },
        }),
      }
    );
    const apiResponseJson = await apiResponse.json();

    if (!apiResponse.ok || apiResponseJson.error) {
      return {
        message: "Failed to update account. Please try again later.",
        isError: true,
      };
    }

    await db
      .update(dbUser)
      .set({ units: values.units })
      .where(eq(dbUser.id, userId));

    await updateSession({
      ...session,
      user: { ...session.user, user_metadata: { units: values.units } },
    });

    return {
      message: "Account updated successfully.",
      isError: false,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again later.",
      isError: true,
    };
  }
}
