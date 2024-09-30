const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "https://react-mk-front.azurewebsites.net",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`CORS-enabled server listening on port ${port}`);
});
