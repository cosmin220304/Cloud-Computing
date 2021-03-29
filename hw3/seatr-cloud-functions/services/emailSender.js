const nodemailer = require("nodemailer");

module.exports.sendEmail = async (code) => { 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seatr.the.best',
      pass: '}FyKz4uB-p)HV8^%DzpJu"sMzwNqyz[RCJq]p}+~4THDc>8X64'
    }
  });
  transporter.sendMail(
    {
      from: 'seatr.the.best@gmail.com',
      to: 'cosmin.aftanase@yahoo.com',
      subject: 'SeatR',
      text: `Here's the code: ${code}`
  })
  // transporter.sendMail(
  //   {
  //     from: 'seatr.the.best@gmail.com',
  //     to: 'stefant99@gmail.com',
  //     subject: 'SeatR',
  //     text: `Here's the code: ${code}`
  // })
}