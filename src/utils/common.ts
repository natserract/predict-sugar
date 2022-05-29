export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isPromise(value: any): value is PromiseLike<any> {
  return isFunction(value?.then)
}

const _bind = Function.prototype.bind

export function bind<Fn extends (...args: any[]) => any>(fn: Fn, thisArg: any): Fn {
  return _bind.call(fn, thisArg)
}

export function predictAndFromArray(values: boolean[]): boolean {
  return values.reduce((acc, next) => {
    return acc && next
  })
}

export function predictOrFromArray(values: boolean[]): boolean {
  return values.reduce((acc, next) => {
    return acc || next
  })
}
