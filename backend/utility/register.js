const userLib = require('userLib')
const EmailValidationModel = require('../model/email_validation')
const register = {};
const registerError = {};
register.register = (user) =>{
    return Promise.reset()
        .then(()=>userLib.doesUserExist(user))
        .catch(()=>{
            throw registerError.registration_failed;
        })
        .then(()=>{
            EmailValidationModel
                .update(
                    {
                        username:user.username,
                        password:user.password,
                        valid:true,
                    },
                    {
                        $set:{valid:false}
                    },
                    {
                        multi:true,
                        upsert:true,
                    }

                )
        })
}


registerError.registration_failed={
    code: 'ERR_REGISTRATION_FAILED',
    message: 'We cannot register your account now.'
}