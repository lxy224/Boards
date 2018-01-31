const nodeMailer = require("nodemailer");
const mailer = {};
let transporter  = nodeMailer.createTransport('SMTP',{
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port:465,
    auth: {
        user:'xiaoyingli0224@gmail.com', //邮箱
        pass: '1994224lxy', //登入密码
    }
});

let defaultOptions = {
    from:'"XIAOYING"<xiaoyingli0224@gmail.com>',
    to:"xiaoyingli0224@gmail.com",
    subject:"Validation",
    text:"Hello world text",
    //附件
};
mailer.send = (_options)=>{
    let options = Object.assign(defaultOptions,_options)
    return new Promise((resolve,reject)=>{
        transporter.sendMail(options,(err,info)=>{
            if(err){
                reject(err)
                console.log("email sending error")
            }
            else{
                resolve(info)
                console.log("email sending successfully")
            }
        })
    })


}

mailer.validationTemplate = (code) => {
    return {
        subject: 'Validation',
        text: 'Your Validation Code is ' + code
    }
};

module.exports = mailer;