export type ResponseBody<T = unknown> = {
  success: boolean;
  message: string | undefined;
  data: T;
};
