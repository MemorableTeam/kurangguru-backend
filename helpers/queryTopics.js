const queryTopics = {
  getAll: () => {
    let query = `SELECT topics.id, id_class, topics.topic_name, topics.is_finished, score.score
        FROM topics
        LEFT JOIN score ON topics.id_class = score.score 
        ORDER BY topics.topic_name `;
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
