const pg = require("../helpers/connection")

const setupModel = {
  setup: () => {
    return new Promise((resolve, reject) => {
      pg.query('select * from users', (err, result) => {
        if (err) {
          reject({
            message: 'error',
            data: err
          })
        }
        console.log(result)
        resolve({
          message: 'success',
          data: result.rows
        })
      })
    })
  }
}

module.exports = setupModel