"use server";

import { ActionFormState } from "@/shared/api";
import {
  addExerciseFormSchema,
  AddExerciseFormSchema,
} from "./add-exercise-model";
import { db } from "@/db/database";
import { and, eq } from "drizzle-orm";
import { customExercise, user as dbUser } from "@/db";
import type { UploadApiResponse } from "cloudinary";
import { getCloudinary } from "@/shared/lib/cloudinary/setup";
import { slugify } from "@/shared/lib";

//? Add image as form data because you can't pass a file to a server action
export async function addExercise(
  values: Omit<AddExerciseFormSchema, "image"> & { image?: FormData },
  userId: string
): Promise<ActionFormState> {
  const image = values.image
    ? (Object.fromEntries(values.image.entries())["image"] as File)
    : undefined;

  const parsed = addExerciseFormSchema.safeParse({
    ...values,
    image,
  });

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
      message: "User not found",
      isError: true,
    };
  }

  let imageUrl: string | undefined;
  if (image) {
    try {
      const cloudinary = getCloudinary();

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                tags: ["custom-exercises", userId],
                folder: `custom-exercises/${userId}`,
                resource_type: "image",
              },
              function (error, result) {
                if (error) {
                  reject(error);
                  return;
                }
                resolve(result);
              }
            )
            .end(buffer);
        }
      );

      if (!result) {
        throw new Error("Error uploading image");
      }

      imageUrl = result.secure_url;
    } catch (error) {
      return {
        message: "Error uploading image",
        isError: true,
      };
    }
  }

  try {
    const existingExercise = await db.query.customExercise.findFirst({
      where: and(
        eq(customExercise.userId, userId),
        eq(customExercise.slug, slugify(parsed.data.name))
      ),
    });

    if (existingExercise) {
      return {
        message:
          "Exercise with this name already exists. Please choose another name or edit the existing exercise.",
        isError: true,
      };
    }

    await db.insert(customExercise).values({
      ...parsed.data,
      slug: slugify(parsed.data.name),
      image: imageUrl,
      userId,
    });
  } catch (error) {
    return {
      message: "Error adding exercise",
      isError: true,
    };
  }

  return {
    message: "Your exercise has been added successfully",
    isError: false,
  };
}
