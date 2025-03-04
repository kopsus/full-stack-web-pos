export type IDialog<T> = {
  show: boolean;
  type: "CREATE" | "UPDATE" | "DELETE";
  data: T | null | string;
};
