import { AuthUser } from "./shared/api";
import { Claims } from "@auth0/nextjs-auth0";

declare module "@auth0/nextjs-auth0" {
  interface Claims extends AuthUser {}
}
