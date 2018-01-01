const express = require('express');
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username : String,
    password : String
});
const User = mongoose.model('users', UserSchema);

const routes = express.Router();
routes.post('/login', (req, res) => {
    // res.json(data);
    let username = req.body.user.username;
    let password = req.body.user.password;
    var user = new User();
    user.username = username;
    user.password = password;
    // user.save(function(err, user_Saved){
    //     if(err){
    //         throw err;
    //         console.log(err);
    //     }else{
    //         console.log('saved!');
    //     }
    // });
    var dbfind={'username':username,'password':password};
    User.find(dbfind, (err, docs) => {
        (err) && (res.send(err));
        res.json(docs);
    });


});

routes.post('/signup', (req, res) => {
    let username = req.body.user.username;
    let password = req.body.user.password;
    var user = new User();
    user.username = username;
    user.password = password;
    console.log(user)
    var dbfind={'username':username};

    User.find(dbfind, (err, docs) => {
        (err) && (res.send(err));
        if(docs.length<=0){
            User.create(user, function (err, docs) {
                (err) && (res.send(err));
                res.json(docs);
                console.log('The raw response from Mongo was ', docs);
            });
        }
        else{
            res.json("exit");
        }

    });


})

module.exports = routes;