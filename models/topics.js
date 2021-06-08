const pg = require("../helpers/connection");
const formResponse = require("../helpers/formResponse");
const { getAll, addTopics } = require("../helpers/queryTopics");

const topicsModel = {
  getAllTopics: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(getAll(request), (err, response) => {
        console.log(err)
        if (!err) {
          console.log(response)
          if (response.rows.length < 1) {
            reject(`Topic Not Found`, 404)
          } else {
            resolve(
              formResponse(`Class Progress In here`, 200, response.rows)
            );
          }
        }else{
          reject('Error Get Data ', 500)
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
  editTopic : (request)=>{
    /* const {topics_name, is_finished} = request */
    return new Promise((resolve, reject)=>{
      pg.query(`SELECT * FROM topics WHERE id=${request.topics_id}`, (error, result)=>{
        if(!error){
          if(result.rows.length < 1) {
            reject(formResponse('Data Not Found'), 404)
          }else{
            const newBody = {
              id_class:request.id_class ?? result.rows[0].id_class,
              topics_name : request.topics_name ?? result.rows[0].topic_name,
              is_finished : request.is_finished ?? result.rows[0].is_finished
            }
            const {id_class, topics_name, is_finished} = newBody
            pg.query(`UPDATE topics SET id_class='${id_class}', topic_name = '${topics_name}', is_finished = '${is_finished}' WHERE id=${request.topics_id}`,(err, res)=>{
              if(!err){
                resolve(formResponse('Update Success', 200))
              }else{
                reject(formResponse('Update Failed', 500))
              }
            })
          }
        }else{
          reject(formResponse('Error Update Topic'), 500)
        }
      })
    })
  }
};

module.exports = topicsModel;
