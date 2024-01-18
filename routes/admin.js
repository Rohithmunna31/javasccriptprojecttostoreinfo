const express = require("express");

const path = require("path");

const route = express();

const adminController = require("../controllers/admin");

route.get("/adduser", adminController.getAdduser);


module.exports = route;
