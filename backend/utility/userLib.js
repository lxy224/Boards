const userModal = require('../model/user');

const userLib={};

userLib.doesUserExist = (user) =>{
    return new Promise((resolve,reject)=>{
        userModal
            .find({
               username:user.username
            })
            .exec((err,entries)=>{
                console.log("User fond:", err,entries);
                if(err|| entries.length>0){
                    console.log("reject")
                    reject();
                }
                else{
                    console.log("resolve")
                    resolve();
                }
            })
    })

}
userLib.insertUser = (user) =>{
    return new Promise((resolve,reject)=>{
        let model = new userModal({
            username:user.username,
            password:user.password
        });
        model.save(function (err,doc) {
           if(err){
               console.log("INSERT USER FAILED")
               reject();
               return;
           }
            resolve()
        })
    })
}

userLib.getAllUsers = ()=>{
    return new Promise((resolve,reject)=>{
        userModal
            .find({},{username:true})
            .exec((err,entries)=>{
                console.log("User fond:", err,entries);
                if(err|| entries.length>0){
                    console.log("get all users");

                    resolve(entries);
                }
                else{
                    console.log("get all users failed")
                    reject(err);
                }
            })
    })
}
module.exports = userLib