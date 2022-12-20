
const express = require('express');
const router = express.Router();
// const { authorisation, authentication } = require("../middleware/auth");
const { signup,userLogin,getUserDetail,updateUser,updatePassword } = require("../controllers/userController");
const { authentication,authorisation } = require('../middleware/auth');



//APIS for user
router.post("/register", signup);
router.post("/login", userLogin);
router.get("/user/:userId" ,authentication,getUserDetail)
router.put('/user/:userId',authentication,authorisation, updateUser) //tested: working // commit authorisation
router.put('/user/:userId/changepassword',authentication,authorisation, updatePassword) //tested: working // commit authorisation

module.exports=router