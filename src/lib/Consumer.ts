import {
  AnyReturn,
  Narrowable,
  OverrideStatementFunction,
  ReturnOfStatement,
  StatementArg,
  StatementCollection
} from "../types/types";
import { bind } from "../utils/common";

class Consumer<T extends Narrowable> {
  protected destination: StatementCollection<T, ReturnOfStatement>;

  constructor(private statement: Partial<StatementCollection<T, ReturnOfStatement>>) {
    let partialCondition: StatementCollection<T, ReturnOfStatement>;
    let context: AnyReturn;

    context = Object.create(statement);
    partialCondition = {
      if: statement.if && bind<AnyReturn>(statement.if, context),
      else: statement.else && bind<AnyReturn>(statement.else, context)
    }

    this.destination = partialCondition
  }

  if(executor: StatementArg<ReturnOfStatement>) {
    const { destination } = this

    if (destination.if) {
      const ifFn = destination.if as OverrideStatementFunction<T>

      return ifFn(executor)
    }

    return
  }

  else(executor: StatementArg<ReturnOfStatement>) {
    const { destination } = this

    if (destination.else) {
      const elseFn = destination.else as OverrideStatementFunction<T>

      return elseFn(executor)
    }

    return
  }
}


export default Consumer
