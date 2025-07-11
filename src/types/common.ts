export type RequiredProp<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Required<Pick<T, K>>;
export type KeyOf<T> = Extract<keyof T, string>;
export type ValueOf<T> = T[KeyOf<T>];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make all properties in T required
 */
export type RequiredNonNull<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
export type RequiredPropNonNull<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  RequiredNonNull<Pick<T, K>>;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type RestrictKeys<M, T> = {
  [K in keyof M]: K extends keyof T ? T[K] : never;
};
export interface SelectItem {
  name?: string | null;
  title?: string | null;
  image?: string | null;
  displayName?: string | null;
}
export type ReplacePropertyType<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? (T[P] extends undefined ? NewType | undefined : NewType) : T[P];
};
export type NullableProp<T, K extends keyof T> = {
  [P in K]: T[P] | null;
} & Omit<T, K>;
