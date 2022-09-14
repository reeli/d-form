type AnyObject = { [key: string]: any };

type Obj<T extends AnyObject> = Required<{ [K in keyof T]: (value: T[K]) => Obj<T> & { build: () => T } }>

export function ObjectBuilder<T extends AnyObject>(obj = ({} as Obj<T>)): Obj<T> {
  return new Proxy({} as T, {
    get(_target: any, prop: string | symbol) {
      if (prop === "build") {
        return () => obj;
      }

      return (value: T[keyof T]) => ObjectBuilder({...obj, [prop]: value})
    }
  })
}

