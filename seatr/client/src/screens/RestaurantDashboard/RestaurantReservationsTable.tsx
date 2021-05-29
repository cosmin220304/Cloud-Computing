import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Button, Container } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Reservation from "../../models/Reservation";
import axios from "axios";
import Restaurant from "../../models/Restaurant";

interface IProps {
  restaurantName: string;
}

const RestaurantReservations = (props: { restaurant: Restaurant }) => {
  const { restaurant } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  const getAndSetReservations = () => {
    axios
      .get(`/api/reservation`, { params: { restaurantName: restaurant.name, }, withCredentials: true })
      .then((res) => {
        console.log(res);
        setReservations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAndSetReservations();
  }, []);

  const acceptReservation = (reservation: Reservation) => {
    axios
      .post(`/api/reservation/${reservation._id}`, { status: "ACCEPTED" }, { withCredentials: true })
      .then((res) => {
        getAndSetReservations();
      });
  };

  const declineReservation = (reservation: Reservation) => {
    axios
      .post(`/api/reservation/${reservation._id}`, { status: "DECLINED" }, { withCredentials: true })
      .then((res) => {
        getAndSetReservations();
      });
  };
  return (
    <div>
      {(reservations.length &&
        reservations.map((val: Reservation, id: number) => (
          <Paper className="p-1 center-children">
            <div className="center-children">
              <div>restaurant: {val.restaurantName}</div>
              <div>phone: {val.userPhone}</div>
              <div>status: {val.status}</div>
              <div>date: {val.reservationDate.toString().split("T")[0]}</div>
              <div>time:{" "}{val.reservationDate.toString().split("T")[1].split(".")[0]}</div>
              <div>number of seats:{val.seatCount}</div>
              <div className="flex">
                <Button onClick={() => declineReservation(val)}> Decline </Button>
                <Button onClick={() => acceptReservation(val)}> Accept </Button>
              </div>
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
