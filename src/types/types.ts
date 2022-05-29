export type AnyReturn = any

export type Cast<A, B> = A extends B ? A : B

export type Key = string | number | symbol

export type Keys<U extends any> = U extends unknown ? keyof U : never

export type Narrowable = string | number | boolean | void

// `* -> *` constructors
export interface URItoKind<A> {}

// `* -> * -> *` constructors
export interface URItoKind2<E, A> {}

// `* -> * -> * -> *` constructors
export interface URItoKind3<R, E, A> {}

// `* -> * -> * -> * -> *` constructors
export interface URItoKind4<S, R, E, A> {}

export type URIS = keyof URItoKind<any>
export type URIS2 = keyof URItoKind2<any, any>
export type URIS3 = keyof URItoKind3<any, any, any>
export type URIS4 = keyof URItoKind4<any, any, any, any>

export type StatementArg<A> = (value: boolean | boolean[]) => A
export type StatementFunction<A, B> = (executor: StatementArg<B>) => A | B | undefined

export type StatementCollection<A, F> = {
  readonly if?: A | F | StatementFunction<A, F>
  readonly else?: A | F | StatementFunction<A, F>
}

export type ReturnOfStatement = {
  exec: <T extends Narrowable>(
    statement: StatementCollection<T, ReturnOfStatement>
  ) => StatementCollection<T, ReturnOfStatement>
}

export type OverrideFunctionStatement<T> = StatementFunction<T, ReturnOfStatement>

export interface Implementor {
  predict: (value: boolean) => ReturnOfStatement
  predictAnd: (values: boolean[]) => ReturnOfStatement
  predictOr: (values: boolean[]) => ReturnOfStatement
  returnOf: <T>(
    value: StatementCollection<T, ReturnOfStatement>
  ) => ReturnOfStatement | T | StatementFunction<T, ReturnOfStatement> | undefined
}
