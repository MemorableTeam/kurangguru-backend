const setupRouter = require('./setup')
const userRouter = require('./users');
const useAuth = require('./Auth');
const classRouter = require('./class');

const router = (app, prefix) => {
  // app.use(`${prefix}/route`, router)
  app.use(`${prefix}/setup`, setupRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/auth`, useAuth);
  app.use(`${prefix}/class`, classRouter);
}

module.exports = router;