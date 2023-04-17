const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const GENERATOR_CODE = require("./GeneratorVerifyCodeUtil.js");

const config = {
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: "zz2255686@qq.com",
    pass: "npzshqoylaubbbhj",
  },
};

const transporter = nodemailer.createTransport(config);

function send(receiveMail, verifyCode) {
  const mailObj = {
    from: "'Programming Education'<zz2255686@qq.com>",
    to: receiveMail,
    subject: "Programming Learning",
    html:
      `
            <p>Programming Learning Verify Code：</p>
        <span style="font-size: 18px; color: red">` +
      verifyCode +
      `</span>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailObj, (err, data) => {
      if (err) {
        reject(); // fail
      } else {
        console.log("Email sent successfully! -->" + receiveMail);
        resolve(); // success
      }
    });
  });
}

module.exports = { send };

function sendVerifyMail(email) {
  const verifyCode = GENERATOR_CODE.verifyCode();
  send(email, verifyCode)
    .then(async () => {
      console.log(
        "=======Login Verify Code send to " + email + " Success======"
      );
      // clear the old verify code to confirm the verify code is latest or unique
      await Code.destroy({ where: { email: email } });
      // create a new verify code
      await Code.create({ email: email, code: verifyCode });
      setTimeout(async () => {
        await Code.destroy({ where: { email: email } });
      }, 1000 * 60 * 5); // wait for 5 minutes, and then delete the verify code
    })
    .catch(() => {
      console.log("Login Verify Code send to " + email + " Failed");
    });

  return verifyCode;
}

module.exports = { sendVerifyMail };
