
const express = require('express');
const router = express.Router();
// const { authorisation, authentication } = require("../middlewares/auth");
const { signup,userLogin,getUserDetail } = require("../controllers/userController");


//APIS for user
router.post("/register", signup);
router.post("/login", userLogin);
router.get("/user/:userId", getUserDetail)
// router.put('/user/:userId/profile', authentication, authorisation, validateUserPut, updateUser) //tested: working // commit authorisation

module.exports=router