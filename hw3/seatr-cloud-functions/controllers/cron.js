const { sendEmail } = require("../services/emailSender");
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

module.exports.sendNotifications = async (req, res) => {
  try {
    const [users] = await datastore.createQuery("User").run();
    console.log(users);
    users.forEach((user) => {
      console.log("sendint email to", user.email);
      sendEmail(user.email, `Don't forget to eat out today`);
    });
    res.status(200).json({ message: "mails sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
