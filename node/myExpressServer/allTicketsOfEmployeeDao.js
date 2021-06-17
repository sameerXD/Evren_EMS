const sql1 = require("./database.js");

const sqlCon = sql1.sqlConnector();

function allTicketsEmployee(userId){

  var sql = "SELECT * FROM ticketsassign WHERE (userId) = ?";
  sqlCon.query(sql,[userId],function(err,result,fields){
    if(err) throw err;

    console.log("tickeAssigned id  " + result);
  });

}

module.exports={allTicketsEmployee};
