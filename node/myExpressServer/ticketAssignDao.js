const sql1 = require("./database.js");

const sqlCon = sql1.sqlConnector();

function AssignTickets(userId,ticketId){

  var sql = "INSERT INTO ticketsassign (userId,ticket_id) VALUES (?,?)";
  sqlCon.query(sql,[userId,ticketId],function(err,result,fields){
    if(err) throw err;
    id = result.insertId;
    console.log("tickeAssigned id  " + id);
  });

}

module.exports={AssignTickets};
