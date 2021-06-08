const pg = require("../helpers/connection");
const formResponse = require("../helpers/formResponse");
const { getAll, addTopics } = require("../helpers/queryTopics");

const topicsModel = {
  getAllTopics: (request) => {
    console.log(request);
    return new Promise((resolve, reject) => {
      pg.query(getAll(request), (err, response) => {
        console.log(err, "ini err");
        console.log(response);
        if (!err) {
          console.log(!err, "!err");
          if (response.rows.length < 1) {
            if (request.role === "users")
              reject(
                formResponse(`Class Progress not foundt`, 400, {
                  data: {
                    score: score,
                  },
                })
              );
          } else {
            resolve(
              formResponse(`Class Progress In here`, 200, response.rows[0])
            );
          }
        }
      });
    });
  },

  addTopics: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT * FROM topics where id_class = ${request.id_class} AND topic_name = '${request.topic_name}'`,
        (error, result) => {
          if (error) {
            reject(
              formResponse(`Class progress alredy exits`, 400, result.rows[0])
            );
          } else {
            if (result.rows.length > 1) {
              reject(
                formResponse(`Add Class Progress Failed`, 400, result.rows[0])
              );
            } else {
              pg.query(addTopics(request), (err, res) => {
                // console.log(err);
                if (!err) {
                  resolve(
                    formResponse(
                      "Success! Add Class Progress",
                      201,
                      result.rows[0]
                    )
                  );
                } else {
                  reject(
                    formResponse(
                      "Failed! class progress alredy exits",
                      400,
                      result.rows[0]
                    )
                  );
                }
              });
            }
          }
        }
      );
    });
  },
};

module.exports = topicsModel;
