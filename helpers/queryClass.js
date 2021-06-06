const { request } = require("express")

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
    let query = `select a.*, count(case b.is_finished when true then 0 end) as topic_completed, count(case b.is_finished when false then 0 end) as topic_uncompleted, count(b.is_finished) as total_topic from class as a 
    join topics as b on b.id_class = a.id group by a.id`

    if (request.user_id) query = `select a.* from (${query}) as a inner join user_class as b on b.class_id = a.id where b.user_id = ${request.user_id}`
    return query
  },

  getClassByUser: (request) => {
    // const score = `select * from topics as a left join score as b on b.topic_id = a.id where b.user_id = ${request.user_id}`
    // const query = `select a.*, count(case b.is_finished when true then 0 end) as topic_completed, count(case b.is_finished when false then 0 end) as topic_uncompleted, count(b.is_finished) as total_topic from class as a
    // join topics as b on b.id_class = a.id 
    // inner join user_class as c on c.class_id = a.id where c.user_id = ${request.user_id} 
    // group by a.id, c.id`

    // return query
  },

  getClassById: (request) => { return `select * from class where id = ${request.id}` },

  addClass: (request) => {
    const { name, category, description, price, day, start_time, end_time, level, fasilitator } = request
    const query = `insert into class(name, category, description, price, day, start_time, end_time, level, created_at, id_fasilitator)
                  VALUES('${name}', '${category}', '${description}', '${price}', '${day}', '${start_time}', '${end_time}', '${level}', 'now()', ${fasilitator})`

    return query
  },

  editClass: (request, initial) => {
    const { id, name = initial.name, category = initial.category, description = initial.description, price = initial.price, day = initial.day, start_time = initial.start_time, end_time = initial.end_time } = request
    const query = `update class set name='${name}', category = '${category}', description='${description}', price=${price}, day='${day}', start_time='${start_time}', end_time='${end_time}', updated_at='now()' where id = ${id}`

    return query
  }
}

module.exports = queryClass