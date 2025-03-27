declare type Strict<T> = {
  [K in keyof T]: T[K] extends object ? Strict<T[K]> : T[K];
}