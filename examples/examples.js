const { predict } = require('../dist/lib')

// :: Default way
//
predict(true).exec({
  if() {
    console.log(true)
  },
  else() {
    console.log(false)
  }
})


// :: Nested way
//
const text = "hello world"

predict(text.length > 3).exec({
  if(thenIf){
    thenIf(text.length < 5).exec({
      if() {
        console.log(true)
      },
      else(thenElse) {
        thenElse(text.split('')[0] == "h").exec({
          if() {
            console.log(false)
          }
        })
      }
    })
  }
})
