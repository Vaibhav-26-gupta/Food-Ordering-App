const PORT = 8080;
const express = require("express");
const app = express();
const Route1 = require("./Routes/createUser");
const Route2 = require("./Routes/displayData");
const OrderData = require("./Routes/OrderData");

const mongoDB = require("./db");

mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use("/api", Route1);
app.use("/api", Route2);
app.use("/api", OrderData);
app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
