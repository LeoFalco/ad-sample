const app = require('./app')

const port = 3333
app.listen(port, () => {
  console.log(`server listen on port ${port} ...`)
})