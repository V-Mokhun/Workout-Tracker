export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type AuthUser = {
  name: string;
  sub: string;
  nickname?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
};
