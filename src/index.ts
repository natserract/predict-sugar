import Predict from "./lib/Predict"
import {
  StatementArg,
  StatementFunction,
  ReturnOfStatement,
  StatementCollection,
  OverrideFunctionStatement
} from './types/types'

export {
  StatementArg,
  StatementFunction,
  ReturnOfStatement,
  StatementCollection,
  OverrideFunctionStatement as OverrideStatementFunction
}

const { predict } = new Predict()
export {
  predict
}
