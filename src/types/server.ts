export type ResponseBody<T = unknown> = {
  success: boolean;
  data: T;
};
