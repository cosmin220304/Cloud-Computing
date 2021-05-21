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
      .get(`/api/reservation`, { params: { restaurantName: restaurant.name } })
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
      .post(`/api/reservation/${reservation._id}`, { status: "ACCEPTED" })
      .then((res) => {
        getAndSetReservations();
      });
  };
  const declineReservation = (reservation: Reservation) => {
    axios
      .post(`/api/reservation/${reservation._id}`, { status: "DECLINED" })
      .then((res) => {
        getAndSetReservations();
      });
  };
  return (
    <div>
      {(reservations.length &&
        reservations.map((val: Reservation, id: number) => (
          <Paper>
            <Container>
              <Typography>restaurant: {val.restaurantName}</Typography>
              <Typography>phone: {val.userPhone}</Typography>
              <Typography>status: {val.status}</Typography>
              <Typography>
                date: {val.reservationDate.toString().split("T")[0]}
              </Typography>
              <Typography>
                time:{" "}
                {val.reservationDate.toString().split("T")[1].split(".")[0]}
              </Typography>
              <Typography>number of seats:{val.seatCount}</Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    declineReservation(val);
                  }}
                >
                  Decline
                </Button>
                <Button
                  onClick={() => {
                    acceptReservation(val);
                  }}
                >
                  Accept
                </Button>
              </div>
            </Container>
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
