const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../services/emailSender");
const db = require("../models");
const { Types } = require("mongoose");

module.exports.getReservations = async (req, res) => {
  try {
    const reservations = await db.Reservation.find({ ...req.query });

    return res.status(200).json(reservations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.changeReservationStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const reservationId = req.params.reservationId;
    console.log({ status, reservationId });
    let reservation = await db.Reservation.findById(
      Types.ObjectId(reservationId)
    );
    if (reservation === null)
      return res.status(404).json({ message: "not found" });

    reservation.status = status;
    reservation = await reservation.save();

    return res.status(200).json({ message: "changed status" });
  } catch (err) {
    console.log("Error changing reservation status > ", err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getAllReservationsByRestaurantName = async (req, res) => {
  try {
    const restaurantName = req.path.restaurantName;
    const reservations = await db.Reservation.find({
      restaurantName,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getReservationByDateTime = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const reservationDate = req.params.reservationDate;
    const reservations = await db.Reservation.find({
      restaurantName,
      reservationDate,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createReservation = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName
    const reservation = await db.Reservation.create({
      ...req.body,
      restaurantName,
      id: uuidv4(),
      status: "PENDING",
    });
    console.log(reservation);
    res.status(200).json({ reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.removeReservationById = async (req, res) => {
  try {
    res.status(200).json({ message: "not implemented yet" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
