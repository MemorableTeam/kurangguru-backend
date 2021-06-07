const { request } = require("express")
const pg = require("../helpers/connection")
const fromResponse = require("../helpers/formResponse")
const { getAll, getClassById, getClassBySchedule, getClassByUser, addClass, editClass } = require('../helpers/queryClass')

const classModel = {
  getAllClass: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getAll(request).queryPaginate, (err, result) => {
        if (!err) {
          if (result.rowCount < 1) reject(fromResponse('Class not found!', 400, {
            page_size: request.page_size || 10,
            current_page: request.current_page || 1,
            class_list: {}
          }))
          pg.query(getAll(request).getTotalPage, (err2, total) => {
            if (!err2) {
              resolve(fromResponse('Success!', 200, {
                total_pages: Math.ceil(total.rowCount / (request.page_size || 10)),
                page_size: request.page_size || 10,
                current_page: request.current_page || 1,
                class_list: result.rows
              }))
            } else {
              reject(fromResponse('Failed!', 500))
            }
          })
        } else {
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  },

  getClassBySchedule: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getClassBySchedule(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) reject(fromResponse('Class not found!', 400))
          resolve(fromResponse('Success!', 200, result.rows))
        } else {
          console.log(err)
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  },

  getClassByUser: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getClassByUser(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) reject(fromResponse('Class not found!', 400))
          resolve(fromResponse('Success!', 200, result.rows))
        } else {
          console.log(err)
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  },

  getClassById: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getClassById(request), (err, result) => {
        if (!err) {
          if (result.rowCount < 1) reject(fromResponse('Class not found!', 400))
          resolve(fromResponse('Success!', 200, result.rows[0]))
        } else {
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  },

  addClass: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(addClass(request), (err) => {
        if (!err) {
          resolve(fromResponse('Success!', 201))
        } else {
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  },

  editClass: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`select * from class where id = ${request.id}`, (err, value) => {
        if (!err) {
          if (value.rowCount < 1) reject(fromResponse('Class not found!', 400))
          pg.query(editClass(request, value.rows[0]), (err) => {
            if (!err) {
              resolve(fromResponse('Success!', 200))
            } else {
              console.log(err, '2')
              reject(fromResponse('Failed!', 500))
            }
          })
        } else {
          console.log(err, '1')
          reject(fromResponse('Failed!', 500))
        }
      })
    })
  }

}

module.exports = classModel;