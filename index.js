const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const usersRouter = require('./routes/v1/user.route')
const app = express();
const port = process.env.PORT || 5000;








app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.text());






app.use('/api/v1/users',usersRouter)







app.get("*",(req,res)=>{
  console.log("no route found")
})


app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});