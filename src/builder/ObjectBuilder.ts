import {AnyObject} from "./type";

type Obj<T extends AnyObject> = Required<{ [K in keyof T]: (value: T[K]) => Obj<T> & { build: () => T } }>

export function ObjectBuilder<T extends AnyObject>(ret: Partial<T> = {}): Obj<T> {
  return new Proxy({}, {
    get(_target: any, prop: string | symbol) {
      if (prop === "build") {
        return () => ret;
      }

      return (value: T[keyof T]) => ObjectBuilder({...ret, [prop]: value})
    }
  })
}

