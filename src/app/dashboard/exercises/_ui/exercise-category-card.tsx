import { BasicExerciseCategory } from "@/db";
import { EXERCISES_ROUTE } from "@/shared/consts";
import { Heading } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

interface ExerciseCategoryCardProps<T extends BasicExerciseCategory> {
  route: string;
  data: T;
}

export const ExerciseCategoryCard = <T extends BasicExerciseCategory>({
  data,
  route,
}: ExerciseCategoryCardProps<T>) => {
  return (
    <li>
      <Link href={route} className="flex flex-col group bg-muted rounded-md">
        <div className="relative min-h-48 after:block after:inset-0 after:absolute after:bg-transparent after:transition-colors group-hover:after:bg-black/20">
          <Image
            className="w-full h-auto object-cover rounded-t-md"
            sizes="25vw"
            fill
            src={data.image}
            alt={data.name}
          />
        </div>
        <Heading
          tag="h4"
          className="py-2 px-4 transition-colors group-hover:text-primary"
        >
          {data.name}
        </Heading>
      </Link>
    </li>
  );
};
