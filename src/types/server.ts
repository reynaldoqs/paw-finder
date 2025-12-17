export type ResponseBody<T = unknown> = {
  success: boolean;
  message?: string;
  data: T;
};
