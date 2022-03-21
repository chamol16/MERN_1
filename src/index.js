const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");

//initializations

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/task", require("./routes/task.routes"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//global variables

//starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
