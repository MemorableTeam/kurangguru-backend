const queryTopics = {
  getAll: (request) => {
    let query = null;
    if(request.role == 'user'){
      query = `SELECT a.*, b.score
        FROM topics AS a
        LEFT JOIN (SELECT a.* FROM score AS a INNER JOIN users AS b ON a.user_id = b.id WHERE b.id = ${request.user_id}) AS b ON b.topic_id = a.id
        WHERE a.id_class = ${request.class_id} 
        ORDER BY a.id ASC`;
    }else{
      query = `SELECT * FROM topics WHERE user_id=${request.user_Id} ORDER BY id ASC`;
    }
    return query;
  },

  addTopics: (request) => {
    const { topic_name, id_class, is_finished } = request;
    let query = `insert into topics (topic_name,id_class, is_finished)
        VALUES('${topic_name}',${id_class}, '${is_finished}')`;

    return query;
  },
};

module.exports = queryTopics;
