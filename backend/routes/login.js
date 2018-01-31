const express = require('express');
const userLib = require('../utility/userLib')
const userModal = require('../model/user');
const registerLib = require('../library/register')
const validation = require('../utility/validation')
const responseMessage = require("../library/responseMessage")
// const mongoose = require('mongoose');
//
// var UserSchema = new mongoose.Schema({
//     username : String,
//     password : String,
//     token : String
// });
// const User = mongoose.model('users', UserSchema);

const routes = express.Router();
routes.post('/login', (req, res) => {
    // res.json(data);
    let user = req.body.user;
    userModal.findOneAndUpdate({'username':user.username,'password':user.password },{$set:{'token': user.token}},(err, docs) => {
        (err) && (res.send(err));
        res.cookie('token', user.token, {
            expires: new Date(Date.now() + 1000000)
        });
        res.send(docs);

    });


});

routes.post('/signup', (req, res) => {
    let user = {};
    user.username = req.body.user.username;
    user.password = req.body.user.password;
    console.log(user);
    // let response = res;
     Promise.resolve()
        .then(()=>userLib.doesUserExist(user))
        .then(
            ()=>(registerLib.sendEmail(req,validation.generateCode()))
        )
        .then(
            ()=>( res.json(responseMessage.email_not_exists))
        )
        .catch(
            (err)=>{console.log("err"+err)}
            // res.json(responseMessage.email_exists)
        )


    // userModal.find({'username':user.username}, (err, docs) => {
    //     (err) && (res.send(err));
    //     if(docs.length<=0){
    //         userModal.create(user, function (err, docs) {
    //             (err) && (res.send(err));
    //             res.json(docs);
    //             console.log('The raw response from Mongo was ', docs);
    //         });
    //     }
    //     else{
    //         res.json("exit");
    //     }
    //
    // });


})
routes.post('/signup/validation', (req, res,next) => {
    let user = {
        username:req.body.user.username,
        password:req.body.user.password,
        code: req.body.user.code
    };
    console.log(user);
    Promise.resolve()
        .then(
            ()=>(registerLib.didValidationCorrect(user,1800))
        )
        .then(
            ()=>(userLib.insertUser(user))
        )
        .then(
            ()=>(res.json(user))
        )
        .catch(
            ()=>{
                res.json(responseMessage.exists_user)
            }

        )

})


routes.post('/getUsers', (req, res) => {
    Promise.resolve()
        .then(()=>userLib.getAllUsers())
        .then((users)=>{
            res.json(users)
        })
        .catch(
            ()=>{res.json({})}
        )
});

module.exports = routes;