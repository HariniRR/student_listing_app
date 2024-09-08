const db = require("./database/index.js");
const express = require("express"); 
const app = new express();
const port =  process.env.PORT || 8080;
db();
app.use(express.json());
app.use("/students",deptRoutes);
app.use("/students",studentRoutes);
app.listen(port, () =>{
    console.log(`Express app listerning at http://localhost:${port}`);
});
