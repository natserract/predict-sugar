import Consumer from "./Consumer"
import { Implementor, ReturnOfStatement, Narrowable, StatementCollection, StatementFunction, StatementArg } from "../types/types"
import { predictAndFromArray, predictOrFromArray } from "../utils/common"

class Predict implements Implementor {
  init(
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
   * predict()
   *
   * predict single value `{true, false}`,
   */
  predict(value: boolean): ReturnOfStatement {
    const self = new Predict()

    return self.init(
      value,
      self.predict as StatementArg<ReturnOfStatement>
    )
  };

 /**
  * predictAnd()
  *
  * Laws: `A Λ B = ¬(A -> ¬B)`
  *
  *  `A Λ B` is true if and only if A is true and B is true.
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
   * predictOr()
   *
   * Laws: `A V B = ¬A -> B`
   *
   * `A V B` returns the truth value "true" unless both/includes of its arguments are "false"
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
