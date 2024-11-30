"use client";

import { cn } from "@/shared/lib";
import { PaginationPrimitive } from "@/shared/ui";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  disablePrevious: boolean;
  disableNext: boolean;
}

export const Pagination = ({
  currentPage,
  disableNext,
  disablePrevious,
  totalPages,
}: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <PaginationPrimitive.Pagination>
      <PaginationPrimitive.PaginationContent>
        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationPrevious
            className={cn({
              "mr-3": true,
              "opacity-50 pointer-events-none": disablePrevious,
            })}
            href={createPageUrl(currentPage - 1)}
          />
        </PaginationPrimitive.PaginationItem>

        {currentPage > 2 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink href={createPageUrl(1)}>
              1
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationEllipsis />
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={createPageUrl(currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationLink href="#" isActive>
            {currentPage}
          </PaginationPrimitive.PaginationLink>
        </PaginationPrimitive.PaginationItem>

        {currentPage < totalPages && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={createPageUrl(currentPage + 1)}
            >
              {currentPage + 1}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage < totalPages - 2 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationEllipsis />
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage < totalPages - 1 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={createPageUrl(totalPages)}
            >
              {totalPages}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationNext
            className={cn({
              "ml-3": true,
              "opacity-50 pointer-events-none": disableNext,
            })}
            href={createPageUrl(currentPage + 1)}
          />
        </PaginationPrimitive.PaginationItem>
      </PaginationPrimitive.PaginationContent>
    </PaginationPrimitive.Pagination>
  );
};
