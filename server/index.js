var express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();


app.use(cors());
app.use(bodyParser.json());


//DB connection
const connection = require("./common/db-connection"); 

var apiRouter = require("./routes/api_router");
app.use("/api", apiRouter);


var instrumentRouter = require("./routes/instrument_router");
app.use("/instrument", instrumentRouter);

var instrumentInstances = require("./routes/instrumentinstance_router");
app.use("/instrumentInstances", instrumentInstances);

var loginRouter = require("./routes/login_router");
app.use("/login", loginRouter);

var eventRouter = require("./routes/event_router");
app.use("/events", eventRouter);

connection.connect((err) => {
    if(err){
        console.log('Error while conecting to the database');
        console.log(err);
    }else{
        console.log('Connected to the database');
    }
})

app.listen(8800);