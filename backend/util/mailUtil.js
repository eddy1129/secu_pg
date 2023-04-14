const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const GENERATOR_CODE = require('./GeneratorVerifyCodeUtil.js');

const config = {
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "zz2255686@qq.com",
        pass: "npzshqoylaubbbhj"
    }
};

const transporter = nodemailer.createTransport(config);

function send(receiveMail) {
    const verifyCode = GENERATOR_CODE.verifyCode();

    const mailObj = {
        from: "'Programming Education'<zz2255686@qq.com>",
        to: receiveMail,
        subject: 'Programming Learning',
        html: `
            <p>Programming Learning Verify Code：</p>
        <span style="font-size: 18px; color: red">` + verifyCode + `</span>`,
    }

    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailObj, (err, data) => {
            if(err){
                reject();   // fail
            }else{
                console.log("Email sent successfully! -->" + receiveMail);
                resolve();  // success
            }
        });
    });
}

module.exports = { send }
