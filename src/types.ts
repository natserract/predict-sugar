
type AnyReturn = any;
type Falsy = null | undefined | false | 0 | -0 | 0n | '';

export type Narrowable = string | number | boolean | bigint | void;

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

// export interface ConditionablePipe<T> {
//   readonly if: (
//     callback: ((next: ((value: boolean) => ConditionablePipe<T>)) => ConditionablePipe<T> | Narrowable | undefined
//   )) => ConditionablePipe<T>
// }

export type ConditionableConstructorLike = new <T>(executor: (resolve: (value: T | ConditionableLike<T>) => void, reject: (reason?: any) => void) => void) => ConditionableLike<T>;


// export interface ConditionablePipe<T> {
//   readonly then: (
//     executor: (
//       ifState: <A>(next: (value: boolean) => ConditionablePipe<T>) => A | ConditionablePipe<T>
//     ) => ConditionablePipe<T>
//   ) => ConditionablePipe<T>
// }

type Statements<T, A> = (value: T, executor: A) => T | A

interface ConditionableLike<T> {
   next<TResult1 = T, TResult2 = never>(
    If?: (
      //  (value: T) => TResult1 | ConditionableLike<TResult1>
      Statements<TResult1, ConditionableLike<TResult1>>
    ) | undefined | null,

    Else?: (
      // (reason: any) => TResult2 | ConditionableLike<TResult2>
      Statements<TResult1, ConditionableLike<TResult1>>
    ) | undefined | null

  ): ConditionableLike<TResult1 | TResult2>;
}



export interface ConditionablePipe<T> {
  next<TResult1 = T, TResult2 = never>(
    executor?: (
      (
        If: Statements<TResult1, ConditionableLike<TResult1>>,
        Else: Statements<TResult1, ConditionableLike<TResult1>>
      ) => TResult1 | ConditionableLike<TResult1>) | undefined | null
    ): ConditionablePipe<TResult1 | TResult2>;
}
