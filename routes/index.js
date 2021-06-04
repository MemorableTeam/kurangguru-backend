const setupRouter = require('./setup')
const userRouter = require('./users');

const router = (app, prefix) => {
  // app.use(`${prefix}/route`, router)
  app.use(`${prefix}/setup`, setupRouter)
  app.use(`${prefix}/users`, userRouter)
}

module.exports = router;