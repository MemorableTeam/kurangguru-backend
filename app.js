const express = require("express");
const app = express();
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3003",
  "http://34.232.17.16:3003",
  "http://localhost:7001",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const router = require("./routes");
router(app, "/kurangguru/api/v1");

app.get("*", (req, res) => {
  res.status(404).send({
    message: "Page not found!",
    status: 404,
  });
});

app.listen(port, () => {
  console.log(`Server started on http://${host}:${port}`);
});
