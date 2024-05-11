export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type AuthUser = {
  name: string;
  user_id: string;
  nickname?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
};
