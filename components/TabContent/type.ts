export type InputFormProps<T> = {
  idx: number;
  remove: (id: number) => void;
  add: () => void;
  formMap: Record<number, T>;
};
