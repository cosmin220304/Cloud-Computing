const { Datastore } = require("@google-cloud/datastore");
const { json } = require("express");
const { sendEmail } = require("../services/emailSender");
const datastore = new Datastore();

module.exports.register = async (req, res) => {
  try {
    let user = await datastore
      .createQuery("User")
      .filter("phoneNumber", "=", req.body.phoneNumber)
      .run();
    user = user[0][0];

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.code != req.body.code) {
      return res.status(401).json({ message: "Code is not correct" });
    }
    if ((Date.now() - user.codeCreationDate) / 60000 >= 5) {
      return res.status(401).json({ message: "Code is no longer valid!" });
    }

    const userKey = user[datastore.KEY];
    const newUser = {
      key: userKey,
      data: {
        ...req.body,
      },
    };
    const response = await datastore.save(newUser);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.generateAuthCode = async (req, res) => {
  try {
    const code = Math.floor(Math.random() * 1000 + 1000);
    let userKey = datastore.key("User");
    let user = await datastore
      .createQuery("User")
      .filter("phoneNumber", "=", req.body.phoneNumber)
      .run();
    user = user[0][0];

    if (!user) {
      user = {
        phoneNumber: req.body.phoneNumber,
      };
    } else {
      userKey = user[datastore.KEY];
    }

    updatedUser = {
      key: userKey,
      data: {
        ...user,
        code: code,
        codeCreationDate: Date.now(),
      },
    };

    sendEmail(code);
    var response = await datastore.upsert(updatedUser);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    let user = await datastore
      .createQuery("User")
      .filter("phoneNumber", "=", req.body.phoneNumber)
      .run();
    user = user[0][0];

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.code != req.body.code) {
      return res.status(401).json({ message: "Code is not correct" });
    }
    if ((Date.now() - user.codeCreationDate) / 60000 >= 5) {
      return res.status(401).json({ message: "Code is no longer valid!" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
