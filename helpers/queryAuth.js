const queryAuth = {
    register: (request) => {
      const { email, password, username } = request;
      const query = `INSERT into users(username, email, password, role, created_at) VALUES('${username}','${email}', '${password}', 'user', 'now()') RETURNING id`;
      return query;
    },
  
    login: (request) => {
      const { email } = request;
      const getUser = `SELECT id, email, password, role from users where email = '${email}' OR username='${email}'`;
      return getUser;
    },
  };
  
  module.exports = queryAuth;
  