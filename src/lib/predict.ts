import {
  Narrowable,
  ReturnOfStatement,
  StatementArg,
  StatementFunction,
  StatementCollection,
} from '../types/types'
import { predictAndFromArray, predictOrFromArray } from '../utils/common'
import Consumer from './consumer'

interface Implementor {
  predict: (value: boolean) => ReturnOfStatement
  predictAnd: (values: boolean[]) => ReturnOfStatement
  predictOr: (values: boolean[]) => ReturnOfStatement
  returnOf: <T>(
    value: StatementCollection<T, ReturnOfStatement>
  ) => ReturnOfStatement | T | StatementFunction<T, ReturnOfStatement> | undefined
}

class Predict implements Implementor {
  /**
   * Predict single value `{true, false}`,
   * @method predictAnd
   *
   * @returns {Object} the object includes if, and else statements
   *
   * @example
   *  predict(true).exec({
   *    if() {
   *      console.log(true) // output
   *    },
   *    else() {
   *      console.log(false)
   *    }
   * })
   */
  predict(value: boolean): ReturnOfStatement {
    const self = new Predict()

    return self.init(value, self.predict as StatementArg<ReturnOfStatement>)
  }

  /**
   *
   * Used to stitch together boolean values into a AND operation.
   * @method predictAnd
   *
   * Laws: `A Λ B = ¬(A -> ¬B)`:
   * `A Λ B` is true if and only if A is true and B is true.
   *
   * @returns {Object} the object includes if, and else statements
   *
   * @example
   * predictAnd([
   *   true,
   *   true,
   *   true
   * ]).exec({
   *   if() {
   *     console.log(true) // output
   *   },
   *   else() {
   *     console.log(false)
   *   },
   * })
   *
   */
  predictAnd(args: boolean[]): ReturnOfStatement {
    const self = new Predict()
    const value = predictAndFromArray(args)

    return self.init(value, self.predictAnd as StatementArg<ReturnOfStatement>)
  }

  /**
   * Used to stitch together boolean values into a OR operation.
   * @method predictOr
   *
   * Laws: `A V B = ¬A -> B`:
   * `A V B` returns the truth value "true" unless both/includes of its arguments are "false"
   *
   * @returns {Object} the object includes if, and else statements
   *
   * @example
   * predictOr([
   *   false,
   *   false,
   *   false
   * ]).exec({
   *   if() {
   *     console.log(true)
   *   },
   *   else() {
   *     console.log(false) // output
   *   },
   * })
   */
  predictOr(args: boolean[]): ReturnOfStatement {
    const self = new Predict()
    const value = predictOrFromArray(args)

    return self.init(value, self.predictOr as StatementArg<ReturnOfStatement>)
  }

  /**
   * Method for return of predict function, which return is T | undefined
   * This way, suitable if you need call by value strategy
   * @method returnOf
   *
   * @param value
   * @returns {T}
   */
  returnOf<T>(value: StatementCollection<T, ReturnOfStatement>): T | undefined {
    if (value) {
      return Object.values(value).find(v => v !== undefined) as T
    }
    return value as T
  }

  private init(value: boolean, depend: StatementArg<ReturnOfStatement>): ReturnOfStatement {
    return {
      exec<T extends Narrowable>(statement: StatementCollection<T, ReturnOfStatement>) {
        const newStatement = new Consumer(statement)

        return {
          if: value ? newStatement.if(depend) : undefined,
          else: !value ? newStatement.else(depend) : undefined
        }
      }
    }
  }
}

export default Predict
