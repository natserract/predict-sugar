import Consumer from "./Consumer"
import {
  Narrowable,
  Implementor,
  StatementArg,
  ReturnOfStatement,
  StatementCollection,
} from "../types/types"
import { predictAndFromArray, predictOrFromArray } from "../utils/common"

class Predict implements Implementor {
  private init(
    value: boolean,
    depend: StatementArg<ReturnOfStatement>
  ): ReturnOfStatement {
   return {
     exec: function<T extends Narrowable>(statement: StatementCollection<T, ReturnOfStatement>) {
      const newStatement = new Consumer(statement)

      return {
        if: value ? newStatement.if(depend) : undefined,
        else: !value ? newStatement.else(depend) : undefined,
      }
     }
   }
  }

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

    return self.init(
      value,
      self.predict as StatementArg<ReturnOfStatement>
    )
  };

 /**
  *
  * Used to stitch together boolean values into a AND operation.
  * @method predictAnd
  *
  * Laws: `A Λ B = ¬(A -> ¬B)`
  *
  * `A Λ B` is true if and only if A is true and B is true.
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

    return self.init(
      value,
      self.predictAnd as StatementArg<ReturnOfStatement>
    )
  }

  /**
   * Used to stitch together boolean values into a OR operation.
   * @method predictOr
   *
   * Laws: `A V B = ¬A -> B`
   *
   * `A V B` returns the truth value "true" unless both/includes of its arguments are "false"
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
    const value = predictOrFromArray(args);

    return self.init(
      value,
      self.predictOr as StatementArg<ReturnOfStatement>
    )
  };
}

export default Predict
