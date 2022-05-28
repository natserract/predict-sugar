import Predict from "./lib/Predict"
import {
  StatementArg,
  StatementFunction,
  ReturnOfStatement,
  StatementCollection,
  OverrideStatementFunction
} from './types/types'

export {
  StatementArg,
  StatementFunction,
  ReturnOfStatement,
  StatementCollection,
  OverrideStatementFunction
}

const { predict } = new Predict()
export {
  predict
}
