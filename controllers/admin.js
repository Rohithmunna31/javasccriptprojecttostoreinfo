const express = require("express");
const Expense = require("../model/data");
const path = require("path");

exports.getAdduser = (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
};

exports.deleteExpense = (req,res)=>{
  
}

