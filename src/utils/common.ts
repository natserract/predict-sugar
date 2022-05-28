/**
 * Returns true if the object is a function.
 * @param value The value to check
 */
 export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

const _bind = Function.prototype.bind;

export function bind<Fn extends (...args: any[]) => any>(fn: Fn, thisArg: any): Fn {
  return _bind.call(fn, thisArg);
}
