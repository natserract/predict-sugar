import Consumer from "./Consumer"
import { Implementor, ReturnOfStatement, Narrowable, StatementCollection } from "../types/types"

class Predict implements Implementor {
  predict(value: boolean): ReturnOfStatement {
    return {
      exec: function<T extends Narrowable>(statement: StatementCollection<T, ReturnOfStatement>) {
        const self = new Predict()
        const newStatement = new Consumer(statement)

        return {
          if: value ? newStatement.if(self.predict) : undefined,
          else: !value ? newStatement.else(self.predict) : undefined,
        }
      },
    }
  };
}

export default Predict
