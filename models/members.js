const { request } = require('express')
const pg = require('../helpers/connection')
const formResponse = require('../helpers/formResponse')
const { getAll, addMember, deleteMember, getById, editMember } = require('../helpers/queryMember')


const memberModel = {
	getMembers: (request) => {
		return new Promise((resolve, reject) => {
			pg.query(getAll(request), (err, result) => {
				if (!err) {
					if (result.rowCount < 1) reject(formResponse('Member not found!', 400))
					resolve(formResponse('Success!', 200, result.rows))
				} else {
					console.log(err)
					reject(formResponse('Failed!', 500))
				}
			})
		})
	},

	getMemberById: (request) => {
		return new Promise((resolve, reject) => {
			pg.query(getById(request), (err, result) => {
				if (!err) {
					if (result.rowCount < 1) reject(formResponse('Member not found!', 400))
					resolve(formResponse('Success!', 200, result.rows))
				} else {
					console.log(err)
					reject(formResponse('Failed!', 500))
				}
			})
		})
	},

	addMember: (request) => {
		return new Promise((resolve, reject) => {
			pg.query(`select id from user_class where user_id=${request.user_id} and class_id=${request.class_id}`, (errx, total) => {
				if (!errx) {
					if (total.rowCount >= 1) reject(formResponse('Member exist', 400))
					pg.query(addMember(request), err => {
						if (!err) {
							resolve(formResponse('Success!', 200))
						} else {
							reject(formResponse('Failed', 500))
						}
					})
				} else {
					reject(formResponse('Failed', 500))
				}
			})
		})
	},

	deleteMember: (request) => {
		return new Promise((resolve, reject) => {
			pg.query(deleteMember(request), err => {
				if (!err) {
					resolve(formResponse('Success!', 200))
				} else {
					reject(formResponse('Failed!', 500))
				}
			})
		})
	},

	editMember: (request) => {
		return new Promise((resolve, reject) => {
			pg.query(editMember(request), err => {
				if (!err) {
					resolve(formResponse('Success!', 200))
				} else {
					console.log(err)
					reject(formResponse('Failed!', 500))
				}
			})
		})
	}
}

module.exports = memberModel
