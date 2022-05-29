import Predict from './lib/predict'
import {
  OverrideFunctionStatement,
  ReturnOfStatement,
  StatementArg,
  StatementCollection,
  StatementFunction
} from './types/types'

export {
  StatementArg,
  StatementFunction,
  ReturnOfStatement,
  StatementCollection,
  OverrideFunctionStatement as OverrideStatementFunction
}

const { predict, predictAnd, predictOr } = new Predict()
export { predict, predictAnd, predictOr }
