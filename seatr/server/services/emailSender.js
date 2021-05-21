const nodemailer = require("nodemailer");

module.exports.sendEmail = async (email, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seatr.the.best",
      pass: '}FyKz4uB-p)HV8^%DzpJu"sMzwNqyz[RCJq]p}+~4THDc>8X64',
    },
  });

  transporter.sendMail({
    from: "seatr.the.best@gmail.com",
    to: email,
    subject: "SeatR",
    text: `${message}`,
  }); 
};
