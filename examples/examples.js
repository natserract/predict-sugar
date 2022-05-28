const { predict } = require('../dist/lib')

// :: Default way
predict(true).execute({
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

predict(text.length > 3).execute({
  if(thenIf){
    thenIf(text.length < 5).execute({
      if() {
        console.log(true)
      },
      else(thenElse) {
        thenElse(text.split('')[0] == "h").execute({
          if() {
            console.log(false)
          }
        })
      }
    })
  }
})
