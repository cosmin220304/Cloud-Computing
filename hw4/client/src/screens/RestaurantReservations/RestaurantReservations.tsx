import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Reservation from "../../models/Reservation";
import axios from 'axios'; 

interface IProps {
  restaurantName: string;
}

const RestaurantReservations = (props: IProps) => {
  const { restaurantName } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  useEffect(() => {
    axios.get(`/api/reservations`)
    .then((res) => {
      setReservations(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <div className="m-2 center-children">
      {reservations.map((val: Reservation, id: number) => (
        <Paper className="w-15 p-t-1 center-children">
            <Grid>
              <Typography>restaurant: {val.restaurantName}</Typography>
              <Typography>phone: {val.userPhone}</Typography>
              <Typography>date: {val.reservationDate.toString().split("T")[0]}</Typography>
              <Typography>time: {val.reservationDate.toString().split("T")[1].split('.')[0]}</Typography>
              <Typography>number of seats:{val.seatCount}</Typography>
            </Grid>
            <Grid>
              <Button> Accept </Button>
              <Button>Decline</Button>
            </Grid>
        </Paper> 
      ))}
    </div>
  );
};

export default RestaurantReservations;
