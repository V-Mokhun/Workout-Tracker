"use server";

import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { AccountFormState } from "./account-form";
import { AccountFormSchema, accountFormSchema } from "./account-form-model";
import { db } from "@/db/database";
import { eq } from "drizzle-orm";
import { user as dbUser } from "@/db";
import { format } from "date-fns";

export async function updateAccountSettings(
  values: AccountFormSchema
): Promise<AccountFormState> {
  try {
    const parsed = accountFormSchema.safeParse(values);

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

    //TODO: Calculate imperial/metric units

    if (values.name !== user.name) {
      const [dbResponse, apiResponse] = await Promise.all([
        db
          .update(dbUser)
          .set({
            ...values,
            birthdate: values.birthdate
              ? format(values.birthdate, "YYYY-MM-dd")
              : undefined,
          })
          .where(eq(dbUser.id, userId)),
        fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.AUTH0_MGMT_API_ACCESS_TOKEN}`,
            Accept: "application/json",
          },
          redirect: "follow",
          body: JSON.stringify({
            name: values.name,
            user_metadata: {
              name: values.name,
            },
          }),
        }),
      ]);

      const apiResponseJson = await apiResponse.json();
      if (dbResponse.rowCount === 0 || apiResponseJson.error) {
        return {
          message: "Failed to update account. Please try again later.",
          isError: true,
        };
      }

      await updateSession({
        ...session,
        user: {
          ...session.user,
          name: values.name,
          user_metadata: { ...session.user.user_metadata, name: values.name },
        },
      });
    } else {
      const res = await db
        .update(dbUser)
        .set({
          ...values,
          birthdate: values.birthdate
            ? format(values.birthdate, "YYYY-MM-dd")
            : undefined,
        })
        .where(eq(dbUser.id, userId));

      if (res.rowCount === 0) {
        return {
          message: "Failed to update account. Please try again later.",
          isError: true,
        };
      }
    }

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
