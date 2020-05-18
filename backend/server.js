const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// database
const db = require("./app/models");

// use after seed
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to application."
  });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/room.routes')(app);
require('./app/routes/booking.routes')(app);

// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
