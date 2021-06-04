const setupRouter = require('./setup')

const router = (app, prefix) => {
  // app.use(`${prefix}/route`, router)
  app.use(`${prefix}/setup`, setupRouter)
}

module.exports = router;