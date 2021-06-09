const queryMember = {
  getAll: (request) => {
    return `select a.id, b.id as user_id, b.username, b.photo from user_class as a inner join users as b on b.id = a.user_id where a.class_id = ${request.class_id}`
  },

  addMember: (request) => {
    return `insert into user_class(class_id, user_id) values(${request.class_id}, ${request.user_id})`
  },

  deleteMember: (request) => {
    return `delete from user_class where id=${request.id}`
  },

  getById: (request) => {
    let query = `SELECT a.*, b.score , c.user_id, c.username, c.photo
        FROM topics AS a
        LEFT JOIN (SELECT a.* FROM score AS a INNER JOIN users AS b ON a.user_id = b.id WHERE b.id = ${request.user_id}) AS b ON b.topic_id = a.id
        left join (select a.id, b.id as user_id, b.username, b.photo, a.class_id from user_class as a inner join users as b on b.id = a.user_id where a.class_id = ${request.class_id} and a.user_id = ${request.user_id}) as c on c.class_id = a.id_class
        WHERE a.id_class = ${request.class_id} 
        ORDER BY a.id ASC`

    return query
  },

  editMember: (request) => {
    // let query = `update (SELECT a.*, b.score , c.user_id, c.username, c.photo
    //     FROM topics AS a
    //     LEFT JOIN (SELECT a.* FROM score AS a INNER JOIN users AS b ON a.user_id = b.id WHERE b.id = ${request.user_id}) AS b ON b.topic_id = a.id
    //     left join (select a.id, b.id as user_id, b.username, b.photo, a.class_id from user_class as a inner join users as b on b.id = a.user_id where a.class_id = ${request.class_id}) as c on c.class_id = a.id_class
    //     WHERE a.id_class = ${request.class_id}) as a SET score = ${request.score}, is_finished=${request.is_finished} where id = ${request.id}`

    let query = `update score set score=${request.score} where user_id=${request.user_id} and topic_id=${request.id}`

    return query
  }
}

module.exports = queryMember