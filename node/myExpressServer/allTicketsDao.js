const sql1 = require("./database.js");

const sqlCon = sql1.sqlConnector();

function getTickets(){

  var sql = "SELECT * FROM ticket";
  sqlCon.query(sql,function(err,result,fields){
    if(err) throw err;
    console.log("all tickets " + result[0]);
    return result;
  });

}

module.exports={getTickets};
