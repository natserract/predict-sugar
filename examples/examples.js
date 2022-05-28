const { predict } = require('../dist/lib')

predict(true).execute({
  if() {
    console.log(true)
  },
  else() {
    console.log(false)
  }
})
