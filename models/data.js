const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ExpenseAmount: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  ExpenseCategory: {
    type: Sequelize.STRING,
  },
  ExpenseDescription: {
    type: Sequelize.TEXT,
  },
});

module.exports = Expense;
