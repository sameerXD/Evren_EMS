console.log("hi");
const fs = require('fs');
fs.copyFile('file1','file2',(err)=>{
 if (err) throw err;
 console.log("file1 copied to file2");

})
