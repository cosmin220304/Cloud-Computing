const db = require("../models");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.find({ ...req.query });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await db.User.findOne({ uid })

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.updateUserByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    console.log({ ...req.body });
    const user = await db.User.updateOne(
      { uid },
      { $set: { ...req.body } }
    );

    if (user) {
      return res.status(200).json({ restaurant });
    }
  } catch (err) {
    console.log("Error updating restaurant > ", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const user = await db.User.create({
      ...req.body
    });
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.removeUserByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    const deletedUser = await db.User.deleteOne({ uid });
    console.log(`User with uid ${uid} deleted!`)

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
