import { unitsSchema } from "@/db";
import { z } from "zod";

export const displayFormSchema = z.object({
  units: unitsSchema.default("metric"),
});

export type DisplayFormSchema = z.infer<typeof displayFormSchema>;
