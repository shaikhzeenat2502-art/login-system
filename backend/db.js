const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fullstackchallenge", "zeenat", "12345", {
  host: "localhost",
  dialect: "mysql",
});


sequelize.authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;
