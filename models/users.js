const pg = require("../helpers/connection");
const fs = require('fs');
const { getAllUsers, getById, update } = require("../helpers/queryUsers");
const { resolve } = require("path");

const usersModel = {
  getAll: (request) => {
    return new Promise((resolve, reject) => {
      const query = getAllUsers(request)
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rowCount === 0) {
            reject({
              message: 'User not found',
              status: 400,
              data: {}
            })
          }
          resolve({
            message: 'Success get all users',
            status: 200,
            data: result.rows
          })
        } else {
          console.log(err)
          reject({
            message: 'Error from server occurs',
            status: 500,
            data: {}
          })
        }
      })
    })
  },

  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getById(request), (err, result) => {
        if (!err) {
          if (result.rowCount === 0) {
            reject({
              message: 'User not found',
              status: 400,
              data: {}
            })
          }
          resolve({
            message: 'Success get user',
            status: 200,
            data: result.rows[0]
          })
        } else {
          reject({
            message: 'Error from server occurs',
            status: 500,
            data: {}
          })
        }
      })
    })
  },

  updateUsers: (request) => {
    const { photo } = request
    return new Promise((resolve, reject) => {
      pg.query(getById({ ...request, type: 'update' }), (err, value) => {
        if (!err) {
          if (value.rowCount < 1) {
            photo ? fs.unlinkSync(`public${photo}`) : null
            reject({
              message: 'User not found',
              status: 400,
              data: {}
            })
          }
          const query = update(request, value.rows[0])
          pg.query(query, err => {
            if (!err) {
              photo && value.rows[0].photo !== null ? fs.unlinkSync(`public${value.rows[0].photo}`) : null
              resolve({
                message: 'Success update user',
                status: 200
              })
            } else {
              reject({
                message: 'Error from server occurs',
                status: 500,
                data: {}
              })
            }
          })
        } else {
          photo ? fs.unlinkSync(`public${photo}`) : null
          reject({
            message: 'Error from server occurs',
            status: 500,
            data: {}
          })
        }
      })
    })
  }
}

module.exports = usersModel