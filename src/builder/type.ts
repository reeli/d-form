export type AnyObject = { [key: string]: any };

// 从一个类型中 pick 出所有 required 的 property。遍历 K，然后通过 K 取到 T[K]，T[K] 是带符号位的?，如果 T[K] 是 required 的，则返回 K，否则忽略这个 K
// 这个方式有个问题，就是类型为 any 的 optional 属性也会被 pick，因为 any extends Required<T>[K]
export type PickRequiredType<T extends AnyObject> = { [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] }


// {} extends {a?: string}, but {} does not extend {a: string} or even {a: string | undefined}
type RequiredKeys<T> = { [K in keyof T]-?: ({} extends { [P in K]: T[P] } ? never : K) }[keyof T];
export type ExcludeOptionalProps<T> = Pick<T, RequiredKeys<T>>;

