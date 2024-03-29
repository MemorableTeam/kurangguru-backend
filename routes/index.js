const setupRouter = require('./setup')
const userRouter = require('./users');
const useAuth = require('./auth');
const classRouter = require('./class');
const topics = require('./topics')
const memberRouter = require('./member')

const router = (app, prefix) => {
  // app.use(`${prefix}/route`, router)
  app.use(`${prefix}/setup`, setupRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/auth`, useAuth);
  app.use(`${prefix}/class`, classRouter);
  app.use(`${prefix}/topics`, topics);
  app.use(`${prefix}/members`, memberRouter)
}

module.exports = router;