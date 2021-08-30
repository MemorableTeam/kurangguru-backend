const initialQuery = `select id, username, email, photo, phone, created_at, updated_at, verified_at from users`

const queryUsers = {
  getAllUsers: (request) => {
    if (!request) return initialQuery
    if (request.username) return `select * from (${initialQuery}) as a order by username ${request.username}`
    if (request.created) return `select * from (${initialQuery}) as a order by created_at ${request.created}`
    if (request.verified) return `select * from (${initialQuery}) as a order by verified_at ${request.verified}`
    return initialQuery
  },

  getById: (request) => {
    if (request.id && request.type === 'update') {
      return `select * from users where id = ${request.id}`
    } else if (request.id) {
      return `select * from (${initialQuery}) as a where id = ${request.id}`
    }
  },

  update: (request, initial) => {
    const { id, email = initial.email, username = initial.username, password = initial.password, photo = initial.photo, phone = initial.phone } = request

    return `update users set email='${email}', username='${username}', password='${password}', photo='${photo}', phone='${phone}', updated_at='now()' where id = ${id}`
  }
}

module.exports = queryUsers