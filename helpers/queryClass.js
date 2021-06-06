const queryClass = {
  getAll: (request) => {
    let query = `select a.id, a.name, a.category, a.description, a.level, a.price, a.day, a.start_time, a.end_time from class as a left join user_class as b on b.class_id = a.id where b.user_id is null or b.user_id != ${request.user_id}`

    if (request.category) query = `select * from (${query}) as a where a.category = '${request.category}'`
    if (request.price) query = `select * from (${query}) as a where a.price = '${request.price}'`
    if (request.level) query = `select * from (${query}) as a where a.level = '${request.level}'`

    const getTotalPage = `select * from (${query}) as a`
    const queryPaginate = `select * from (${query}) as a LIMIT ${request.page_size || 10} OFFSET ${((request.current_page || 1) - 1) * (request.page_size || 10)}`

    return { queryPaginate, getTotalPage }
  },

  getClassBySchedule: (request) => {
    // let query = `select a.* from class as a join topics as b on b.id_class = a.id`

    // return query
  },

  getClassById: (request) => { return `select * from class where id = ${request.id}` },


}

module.exports = queryClass