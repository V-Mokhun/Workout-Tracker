import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Container,
} from "@/shared/ui";
import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbsProps {
  routes: { name: string; href: string }[];
  pageName: string;
  className?: string;
}

export const Breadcrumbs = ({
  routes,
  pageName,
  className,
}: BreadcrumbsProps) => {
  return (
    <Breadcrumb className={className}>
      <Container>
        <BreadcrumbList>
          {routes.map((route) => (
            <Fragment key={route.href}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={route.href}>{route.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Container>
    </Breadcrumb>
  );
};
