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




app.get('/', (req,res)=>{
  res.send("Example app listening is running")
})


app.get("*",(req,res)=>{
  res.send("no route found")
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(errorHandler)
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});