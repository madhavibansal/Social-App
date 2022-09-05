const route = require("./routes/index");
const cors = require('cors')
const express = require("express");
const { connectDB } = require("./dbConnect");
const bodyParser = require("body-parser")
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
route(app)


const port = 9000;

//db connection
connectDB();

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
