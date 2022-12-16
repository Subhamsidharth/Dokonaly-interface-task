const userModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const { uploadFile } = require("../aws/aws");
const bcrypt = require('bcrypt');
const mongoose=require("mongoose")


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const signup = async (req, res) => {
    try {
        const data = req.body
        let files = req.files;
        if (Object.keys(data).length == 0)
            return res.status(400).send("please give the all data")

        let { firstName, lastName, email, password } = data
        if (!isValid(files))
        return res.status(400).send({ status: false, message: "firstname is mandatory." })
        if (!isValid(firstName))
            return res.status(400).send({ status: false, message: "firstname is mandatory." })
        if (!isValid(lastName))
            return res.status(400).send({ status: false, message: "lastName is a mandatory." })
        if (!isValid(email))
            return res.status(400).send({ status: false, message: "email is a mandatory." })
        if (!isValid(password))
            return res.status(400).send({ status: false, message: "password is a mandatory." })

            let profileImage = await uploadFile(files[0])
            const hash = bcrypt.hashSync(password, 10); // para1:password, para2:saltRound


        const mail = await userModel.findOne({ email: email })
        if (mail) return res.status(400).send({ status: false, message: "EmailId Already Registered " })

        let userregister = {firstName, lastName, email, password:hash,profileImage}
        const create = await userModel.create(userregister)
        return res.status(201).send({ status: true, message: "User Created Successfully", data: create })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const userLogin = async (req, res) => {
    try {                                                                   
        const body = req.body
        const { email, password } = body

        console.log(body)
        if ((Object.keys(body).length == 0)) {
            return res.status(400).send({ status: false, message: "Please provide The Credential To Login." });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide The Email-id." });
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide The password." });;
        }
        let user = await userModel.findOne({ email: email });
        if (user) {
            const Passwordmatch = bcrypt.compareSync(body.password, user.password);
            if (Passwordmatch) {
                const generatedToken = jwt.sign({
                    userId: user._id,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 3600 * 24 
                }, 'Dokonaly')
                res.setHeader('Authorization', 'Bearer ' + generatedToken)
                return res.status(200).send({
                    "status": true,
                    message: "User login successfull",                      //" user loggedIn Succesfully ✔🟢"
                    data: {
                        userId: user._id,
                        token: generatedToken,
                    }
                });
            } else {
                res.status(401).send({ status: false, message: "Password Is Inappropriate." });
            }
        } else {
            return res.status(400).send({ status: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getUserDetail = async function (req, res) {                            
    try {
        let userIdParams = req.params.userId

        if (!userIdParams || !userIdParams.trim()) return res.status(400).send({ status: false, message: "enter userId in url path" });
        if (!mongoose.isValidObjectId(userIdParams))
            return res.status(400).send({ status: false, message: "User Id is Not Valid" })
        const findUserDetail = await userModel.findOne({ _id: userIdParams }).select({ firstName:1,lastName:1,email:1,profileImage:1,_id:0 })
        if (!findUserDetail) return res.status(404).send({ status: false, message: "No User Exist" })

        // if (userIdParams !== req.userId)
        //     return res.status(403).send({ Status: false, message: "UserId and token didn't Match." });



        return res.status(200).send({ status: true, message: "Yahooo...User profile detail found.", data: findUserDetail })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports={signup, userLogin,getUserDetail}