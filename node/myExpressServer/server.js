const express = require("express");
const bodyParser = require("body-parser");

var path = require("path");
var fileUpload = require('express-fileupload')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const sql1 = require("./database.js");
const sqlcon = sql1.sqlConnector();

//models
const allTickets = require("./allTicketsDao.js");
const assignTicket = require("./ticketAssignDao.js");
const employeeTicket = require("./allTicketsOfEmployeeDao.js")
app.get("/", (request,response)=>{
 response.send("hello");

});

app.get("/about",(req,res)=>{
  res.send("about");
});

app.get("/ticket",(req,res)=>{
  res.sendFile(__dirname + "/web-inf/index.html");
});


app.post("/ticket",(req,res)=>{
  res.send("thanx for posting");

  var clientName = req.body.client_name;
  var email = req.body.email_id;
  var issueType = req.body.issue_type;
  var issue = req.body.issue;
  var id;
  console.log(clientName+email+issueType+issue);
 sqlcon.connect();
var sql = 'INSERT INTO ticket (client_name,email_id,issue_type,issue) VALUES (?,?,?,?)';
sqlcon.query(sql,[clientName,email,issueType,issue], function (err, result, fields) {
   if (err) throw err
   id = result.insertId;
   ticketAttachment(result.insertId);
 console.log('The solution is: ', id)
})

function ticketAttachment(resultId){

var file = req.files.uploaded_image;
var img_name=file.name;

 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

      file.mv('public/images/uploaded_images/'+file.name, function(err) {

          if (err) throw err;
                var sql = "INSERT INTO `ticketattachment`(`ticket_id`,`file`) VALUES ('" + resultId + "','" + img_name + "')";

                    var query = sqlcon.query(sql, function(err, result) {
                         if(err) throw err;
                    });
               });
  } else {
    message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    res.send("inappropriate format");
  }

}

});


app.get("/allTickets", (req,res)=>{
 allTickets.getTickets();

  res.send("all tickets");
})

app.get("/Admin/assignTicket",(req,res)=>{
  res.sendFile(__dirname+ "/web-inf/ticketAssign.html");
});

app.post("/Admin/assignTicket",(req,res)=>{
  assignTicket.AssignTickets(req.body.userId,req.body.ticketId);
  res.send("ticketAssigned");
})

app.get("/employee/alltickets",(req,res)=>{
  res.send("all tickets of "+req.query.user_id);
  employeeTicket.allTicketsEmployee();
})

app.listen(3000,()=>{
  console.log("server started");
});
