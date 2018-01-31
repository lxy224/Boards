const EmailValidationModel = require("../model/email_validation");
const emailUtl = require('../utility/email')
const register = {};

register.sendEmail = (request,code)=>{
    return Promise.resolve()
        .then(()=>register.insertNewRecord(request,code))
        .then(()=>{
            let mailTemplate = emailUtl.validationTemplate(code);
            let mailOptions = {
                to: request.body.user.username,
                subject: mailTemplate.subject,
                text: mailTemplate.text
            };
            return emailUtl.send(mailOptions)
        })
        .catch((error) => {
            throw error;
        })
}

register.didEmailSendBefore = (email, seconds)=>{
    return new Promise((resolve,reject)=>{
        EmailValidationModel
            .find({
                username: email,
                time: {$gt:(new Date()).getTime() - seconds * 1000}
            })
            .exec((err, entries)=>{
                console.log('Email delivery record found:', err, entries);
                if(err|| entries.length>0){
                    reject();
                    return
                }
                resolve();
            })


    })
}
register.didValidationCorrect = (user,seconds)=>{
    return new Promise((resolve,reject)=>{
        EmailValidationModel
            .find({
                username: user.username,
                time:{$gt:(new Date().getTime()) - seconds *1000},
                code: user.code
            })
            .exec((err, entries)=>{
                console.log('Email delivery(with code) record found:', err, entries)
                if(err|| entries.length>0){
                    resolve();
                    console.log("....resolve")
                }
                else {
                    console.log("....reject")
                    reject();
                }

            })
    })
}

register.insertNewRecord = (request, code) =>{
    return Promise.resolve()
        .then(()=>register.didEmailSendBefore(request.body.user.username,60))
        .then(()=>{
            let model = new EmailValidationModel({
                username: request.body.user.username,
                password: request.body.user.password,
                time: (new Date()).getTime(),
                code: code,
                valid: false
            });
            model.save(function (err,doc) {
                console.log(err,doc)
            })

            // return EmailValidationModel.insert({
            //     username: request.body.user.username,
            //     password: request.body.user.password,
            //     time: (new Date()).getTime(),
            //     code: code,
            //     valid: false
            // });
        })
        .catch((err)=>{
        console.log(err);
        throw 'ERR INSERT EMAIL RECORD'
    })
}

module.exports = register;