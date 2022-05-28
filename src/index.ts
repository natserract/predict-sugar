
const _bind = Function.prototype.bind;

function bind<Fn extends (...args: any[]) => any>(fn: Fn, thisArg: any): Fn {
  return _bind.call(fn, thisArg);
}

type Narrowable = string | number | boolean;
type Keys<U extends any> = U extends unknown ? keyof U : never

type Cast<A, B> = A extends B ? A : B;

type MatchExact<A> =
  A extends Narrowable ? A : {
    [K in keyof A]: K extends keyof A ?
      A[K] :
      never
  }

type Key = string | number | symbol;

type MatchStatement<F> = (executor: (statement: <T>() => T | F) => F) => F

interface MatchCondition {
  if?: void | ((executor: (value: boolean) => MatchReturn) => void),
  else?: void | ((executor: (value: boolean) => MatchReturn) => void),
}

class MatchConsumer {
  protected destination: MatchCondition;

  constructor(private cond: MatchCondition) {
    let partialCondition: MatchCondition;
    let context: any;

    context = Object.create(cond);
    partialCondition = {
      if: cond.if && bind(cond.if, context),
      else: cond.else && bind(cond.else, context)
    }

    this.destination = partialCondition
  }

  if(executor: (value: boolean) => MatchReturn) {
    const { destination } = this

    if (destination.if) {
      destination.if(executor)
    }
  }

  else(executor: (value: boolean) => MatchReturn) {
    const { destination } = this

    if (destination.else) {
      destination.else(executor)
    }
  }
}

type MatchReturn = {
  with: (cond: MatchCondition) => MatchCondition
}

interface MatchStruct {
  match: (value: boolean) => void | MatchReturn | undefined
}

class Match  {
  match(value: boolean): MatchReturn {
    return {
      with: function(cond) {
        const statement = new MatchConsumer(cond)

        return {
          if: Boolean(value) ? statement.if(match) : statement.if,
          else: !Boolean(value) ? statement.else(match) : statement.else
        }
      }
    }
  };
}


const { match } = new Match()

match(true).with({
  if(expr) {
    expr(false).with({
      if() {
        console.log("true top")
      },
      else() {
        console.log("false top")
      }
    })
    // expr.if({
      // if:
    // })
    console.log(true)
  },
  else() {
    console.log(false)
  }
})


/**
 * match(text).with({
 *
 * })
 *
 */
