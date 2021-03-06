# Predict Sugar

Syntactic sugar for `if`, `else` **statements** by a **function**. Aim for an implementation both clean and elegant.

> "But it's worth to turn round the question: What is so special about if that it need a special syntax?" from [wiki haskell](https://wiki.haskell.org/Syntactic_sugar/Cons).

## Advantages

- Free of ambiguity and inconsistency
- Consistency with type inference
- Clean and elegant solution
- Support nested statements

## Usage

To use **predict**, just drop a single line into your app:

```sh
import { predict } from 'predict-sugar'
```

See more [real example](https://github.com/natserract/predict-sugar/tree/master/examples).

Download the latest **predict** from GitHub, or install with npm:

```sh
npm install predict-sugar
```

### Basic

Examples of basic statements

```ts
import { predict } from 'predict-sugar'

function testNum(a: number) {
  let result

  predict(a > 0).exec({
    if() {
      result = 'positive'
    },
    else() {
      result = 'NOT positive'
    }
  })

  return result
}

console.log(testNum(-5))
// expected output: "NOT positive"
```

### Nested Statement

You can also use an statement in predict inside a statement. This is known as nested `if else` statement.

```ts
import { predict, returnOf } from 'predict-sugar'

function isMaleGender(gender: string, age: number): string {
  return returnOf(
    predict(gender == 'male').exec<string>({
      if(thenIf) {
        return returnOf(
          thenIf(age > 17).exec({
            if() {
              return 'Laki-laki 18+'
            },
            else() {
              return 'Laki-laki'
            }
          })
        )
      },
      else() {
        return 'Wanita'
        //
        // return false -> If you pass this, will mismatched/ambiguous types,
        // because this exec only return string. You don't need write type annotation
        // `exec<string>`, predict has automatically infer your return type.
      }
    })
  )!
}

console.log(isMaleGender('male', 18))
// expected output: "Laki-laki 18 +"
```

### `AND` operation

We can also write multiple conditions inside a single if statement with `predictAnd`

```ts
import { predictAnd } from 'predict-sugar'

const num = 10

// It's mean: num > 5 && num < 50
predictAnd([num > 5, num < 50]).exec({
  if() {
    return 'num is greater than 5 AND less than 50'
  }
})
```

### `OR` operation

```ts
import { predictOr } from 'predict-sugar'

const num = 10

// It's mean: num > 5 || num < 10
predictOr([num > 5, num < 10]).exec({
  if() {
    return 'num is either less than 10 or greater than 5, or both'
  }
})
```

## License

This program is free software; it is distributed under an [MIT License](https://github.com/natserract/predict-sugar/blob/master/LICENSE).
