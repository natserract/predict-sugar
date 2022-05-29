const { predict, predictAnd, predictOr } = require('../../dist/bundles/index.umd')

// :: Basic
//
predict(true).exec({
  if() {
    console.log(true)
  },
  else() {
    console.log(false)
  }
})

function testNum(a) {
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

// :: Nested
//
const text = 'hello world'

predict(text.length > 3).exec({
  if(thenIf) {
    thenIf(text.length < 5).exec({
      if() {
        console.log(true)
      },
      else(thenElse) {
        thenElse(text.split('')[0] == 'h').exec({
          if() {
            console.log(false)
          }
        })
      }
    })
  }
})

// AND operation
predictAnd([true, true, true]).exec({
  if(thenIfAnd) {
    thenIfAnd([true, true, false]).exec({
      if() {
        console.log('true top')
      },
      else() {
        console.log('false top')
      }
    })
    console.log(true)
  },
  else() {
    console.log(false)
  }
})

// OR operation
predictOr([true, false, false]).exec({
  if(thenIfOr) {
    thenIfOr([true, false, false]).exec({
      if() {
        console.log('true top')
      },
      else() {
        console.log('false top')
      }
    })
    console.log(true)
  },
  else() {
    console.log(false)
  }
})
