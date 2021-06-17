var mysql = require('mysql')

var connection;

function sqlConnector(){
connection = mysql.createConnection(
  {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'evren'
})
return connection;
}



module.exports = { sqlConnector };
