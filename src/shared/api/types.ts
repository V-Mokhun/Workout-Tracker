import { Units } from "@/db";

export type ApiResponse<T> =
  | {
      data: T;
      message: string;
    }
  | {
      error: Error;
    };

export type AuthUser = {
  name: string;
  sub: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  user_metadata: {
    name: string;
    picture: string;
    units: Units;
  };
};
