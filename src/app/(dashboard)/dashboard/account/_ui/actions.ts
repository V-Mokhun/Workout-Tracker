"use server";

import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { AccountFormState } from "./account-form";
import { AccountFormSchema, accountFormSchema } from "./account-form-model";
import { db } from "@/db/database";
import { eq } from "drizzle-orm";
import { user as dbUser } from "@/db";
import { format } from "date-fns";
import {
  calculateImperialFromMetric,
  calculateMetricFromImperial,
} from "@/shared/lib";
import { v2 as cloudinary } from "cloudinary";

export async function updateAccountSettings(
  values: AccountFormSchema,
  userId: string
): Promise<AccountFormState> {
  try {
    const parsed = accountFormSchema.safeParse(values);

    if (!parsed.success) {
      return {
        message: "Invalid form values",
        isError: true,
      };
    }

    const user = await db.query.user.findFirst({
      where: eq(dbUser.id, userId),
    });
    if (!user) {
      return {
        message: "User not found.",
        isError: true,
      };
    }

    const isMetric = user.units === "metric";
    if (isMetric) {
      const { heightImperialFeet, heightImperialInches, weightImperial } =
        calculateImperialFromMetric(
          values.heightMetricMetres,
          values.heightMetricCentimetres,
          values.weightMetric
        );

      values.heightImperialFeet = heightImperialFeet;
      values.heightImperialInches = heightImperialInches;
      values.weightImperial = weightImperial;
    } else {
      const { heightMetricMetres, heightMetricCentimetres, weightMetric } =
        calculateMetricFromImperial(
          values.heightImperialFeet,
          values.heightImperialInches,
          values.weightImperial
        );

      values.heightMetricMetres = heightMetricMetres;
      values.heightMetricCentimetres = heightMetricCentimetres;
      values.weightMetric = weightMetric;
    }

    if (values.name === user.name) {
      await db
        .update(dbUser)
        .set({
          ...values,
          birthdate: values.birthdate
            ? format(values.birthdate, "yyyy-MM-dd")
            : undefined,
        })
        .where(eq(dbUser.id, userId));
    } else {
      const session = await getSession();
      if (!session) {
        return {
          message: "Session not found.",
          isError: true,
        };
      }

      // TODO: Create user service to handle authorization token on 401 error => refetch token
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
              name: values.name,
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
        .set({
          ...values,
          birthdate: values.birthdate
            ? format(values.birthdate, "yyyy-MM-dd")
            : undefined,
        })
        .where(eq(dbUser.id, userId));

      await updateSession({
        ...session,
        user: {
          ...session.user,
          user_metadata: { ...session.user.user_metadata, name: values.name },
        },
      });
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

export async function deleteOldAvatar(
  avatarPublicId: string
): Promise<AccountFormState> {
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.uploader.destroy(avatarPublicId, {
      invalidate: true,
      resource_type: "image",
    });

    return {
      message: "Old avatar deleted successfully.",
      isError: false,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again later.",
      isError: true,
    };
  }
}

export async function updateAccountAvatar(
  imageUrl: string
): Promise<AccountFormState> {
  try {
    if (!imageUrl) {
      return {
        message: "Invalid image url",
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

    const user = await db.query.user.findFirst({
      where: eq(dbUser.id, session.user.sub),
    });
    if (!user) {
      return {
        message: "User not found.",
        isError: true,
      };
    }

    const apiResponse = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.id}`,
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
            picture: imageUrl,
          },
        }),
      }
    );
    const apiResponseJson = await apiResponse.json();

    if (!apiResponse.ok || apiResponseJson.error) {
      return {
        message: "Failed to update avatar. Please try again later.",
        isError: true,
      };
    }

    await db
      .update(dbUser)
      .set({
        avatar: imageUrl,
      })
      .where(eq(dbUser.id, user.id));

    await updateSession({
      ...session,
      user: {
        ...session.user,
        user_metadata: { ...session.user.user_metadata, picture: imageUrl },
      },
    });

    return {
      message: "Profile avatar updated successfully.",
      isError: false,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again later.",
      isError: true,
    };
  }
}
