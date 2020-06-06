const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: 'P@vlovska1991'
});

module.exports = pool.promise();