const { Datastore } = require("@google-cloud/datastore");
const { json } = require("express");
const datastore = new Datastore();
const { v4: uuidv4 } = require("uuid");

const { sendEmail } = require("../services/emailSender");
module.exports.getReservations = async (req, res) => {
  try {
    const restaurantName = req.query.restaurantName;
    const reservationDate = req.query.reservationDate;
    const userEmail = req.query.userEmail;

    let reservationsQuery = datastore.createQuery("Reservation");

    if (userEmail) {
      reservationsQuery = reservationsQuery.filter("userEmail", "=", userEmail);
    }
    if (restaurantName) {
      reservationQuery = reservationsQuery.filter(
        "restaurantName",
        "=",
        restaurantName
      );
    }
    if (reservationDate) {
      reservationQuery = reservationsQuery.filter(
        "reservationDate",
        "=",
        reservationDate
      );
    }

    const [reservations] = await reservationsQuery.run();
    return res.status(200).json(reservations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.changeReservationStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const reservationId = req.params.reservationId;
    let reservationsQuery = await datastore
      .createQuery("Reservation")
      .filter("id", "=", reservationId)
      .run()
      .then((results) => {
        const restaurants = results[0];
        const reservationKey = restaurants[0][datastore.KEY];
        return reservationKey;
      })
      .then(async (reservationKey) => {
        const [reservation] = await datastore.get(reservationKey);
        return { reservationKey, reservation };
      })
      .then(({ reservationKey, reservation }) => {
        sendEmail(
          reservation.userEmail,
          `Your reservation status changed to ${status}`
        );
        return datastore.upsert({
          key: reservationKey,
          data: { ...reservation, status: status },
        });
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    if (reservationsQuery === null)
      return res.status(404).json({ message: "not found" });
    console.log(reservationsQuery);
    return res.status(200).json({ message: "changed status" });
  } catch (err) {
    console.log("Error changing reservation status > ", err.message);
    return res.status(500).json({ message: err.message });
  }
};
module.exports.getAllReservationsByRestaurantName = async (req, res) => {
  try {
    const restaurantName = req.path.restaurantName;
    const reservations = await datastore
      .createQuery("Reservation")
      .filter("restaurantName", "=", restaurantName)
      .run();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getReservationByDateTime = async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const reservationDate = req.params.reservationDate;
    const reservations = await datastore
      .createQuery("Reservation")
      .filter("restaurantName", "=", restaurantName)
      .filter("reservationDate", "=", reservationDate)
      .run();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createReservation = async (req, res) => {
  try {
    const reservationKey = datastore.key("Reservation");
    const restaurantName = req.params.restaurantName;
    const reservation = await datastore.insert({
      key: reservationKey,
      data: {
        restaurantName,
        ...req.body,
        id: uuidv4(),
        status: "PENDING",
      },
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
