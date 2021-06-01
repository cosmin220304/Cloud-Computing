import React, { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import Reservation from "../../models/Reservation";
import axios from "axios";
import Restaurant from "../../models/Restaurant";

const RestaurantReservations = (props: { restaurant: Restaurant }) => {
  const { restaurant } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  const getAndSetReservations = async () => {
    while (1) {
      try {
        const { data } = await axios.get(`/api/reservation`, { params: { restaurantName: restaurant.name, }, withCredentials: true })
        console.log("reservations => ", data.reverse());
        setReservations(data);

        await new Promise(res => setTimeout(res, 1000))
      } catch (err) {
        console.log(err)
      }
    }
  };

  useEffect(() => {
    getAndSetReservations();
  }, []);

  const acceptReservation = (reservation: Reservation) => {
    axios.post(`/api/reservation/${reservation._id}`, { status: "ACCEPTED" }, { withCredentials: true })
  };

  const declineReservation = (reservation: Reservation) => {
    axios.post(`/api/reservation/${reservation._id}`, { status: "DECLINED" }, { withCredentials: true })
  };

  return (
    <div className="flex wrap">
      {(reservations.length &&
        reservations.map((val: Reservation, id: number) => (
          <Paper className="p-1 m-1 flex-column" style={{width: "20rem"}}>
            <div><b>restaurant:</b> {val.restaurantName}</div>
            <div><b>date:</b> {val.reservationDate.toString().split("T")[0]}</div>
            <div><b>time:</b> {val.reservationDate.toString().split("T")[1].split(".")[0]}</div>
            <div><b>number of seats:</b> {val.seatCount}</div>
            <div><b>name:</b> {val.userName}</div>
            <div><b>gender:</b> {val.userGender}</div>
            <div><b>phone:</b> {val.userPhone}</div>
            <div><b>orders:</b> {val.order && val.order !== "" ? val.order : "no orders"}</div>
            <div><b>status:</b> {val.status}</div>
            <div className="flex">
              <Button onClick={() => declineReservation(val)}> Decline </Button>
              <Button onClick={() => acceptReservation(val)}> Accept </Button>
            </div>
          </Paper>
        ))) || (
          <Paper>
            <Typography>
              You don't have any reservations maybe hire a marketing guy
          </Typography>
          </Paper>
        )}
    </div>
  );
};

export default RestaurantReservations;
