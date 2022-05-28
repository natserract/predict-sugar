const _bind = Function.prototype.bind;

function bind<Fn extends (...args: any[]) => any>(fn: Fn, thisArg: any): Fn {
  return _bind.call(fn, thisArg);
}

interface Next<T = any> {
  if?: (value: T) => void;
  elif?: (value: T, next: any) => void;
  else?: (err: any) => void;
  // complete: () => void;
}
class IfOrElse {
  protected destination: Next<any>;

  constructor(private next: Next) {
    let partialNext: Next;
    let context: any;

    context = Object.create(next);
    partialNext = {
      if: next.if && bind(next.if, context),
      elif: next.elif && bind(next.elif, context),
      else: next.else && bind(next.else, context)
    }

    this.destination = partialNext
  }

  if(value: any) {
    const { destination } = this
    if (destination.if) {
      destination.if(value)
    }
  }

  elif(value: any, next:any){
    const { destination } = this
    if (destination.elif) {
      destination.elif(value, next)
    }
  }

  else(value: any) {
     const { destination } = this
     if (destination.else) {
       destination.else(value)
     }
  }
}

class Condition {
  condition<T>(value: boolean) {
    return {
      executor: function(next: Next) {
        const ifOrElse = new IfOrElse(next)

        return {
          if: Boolean(value) ? ifOrElse.if(ifOrElse) : ifOrElse.if,
          elif: (val: any, next: any) => {
            if (Boolean(val)) {
              return ifOrElse.elif(val, ifOrElse)
            }
          },
          else: !Boolean(value) ? ifOrElse.else(ifOrElse) : ifOrElse.else
        }
      }
    }
  }
}

const condition = (value: boolean) => {
  return {
    if: ((next: any) => {
      if (value) {
        next(condition)
      }
    }),
    else: ((next: any) => {
      if (!value) {
        next(condition)
      }
    })
  }
}

const text = "hello"
const text2 = "worlds";

// condition(text.length < 2).executor({
//   if(next) {
//     console.log(true)
//   },
//   else() {
//     console.log(false)
//   }
// })


condition(text.length < 2)
  .if(() => {
    console.log(true)
  })
  .else(() => {
    console.log(false)
  })