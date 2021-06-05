const setupRouter = require('./setup')
const userRouter = require('./users');
const useAuth = require('./Auth')

const router = (app, prefix) => {
  // app.use(`${prefix}/route`, router)
  app.use(`${prefix}/setup`, setupRouter)
  app.use(`${prefix}/users`, userRouter)
  app.use(`${prefix}/auth`, useAuth)
}

module.exports = router;