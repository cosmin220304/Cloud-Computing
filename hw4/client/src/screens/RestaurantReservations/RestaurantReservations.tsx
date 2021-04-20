import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Reservation from "../../models/Reservation";

interface IProps {
  restaurantName: string;
}

const RestaurantReservations = (props: IProps) => {
  const { restaurantName } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  useEffect(() => {
    fetch(
      `/reservation`,
      {
        mode: "no-cors",
      }
    )
      .then((res) => res.json())
      .then((reservations: Array<Reservation>) => {
        console.log(reservations);
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }, []);
  return (
    <div className="m-2 center-children">
      {reservations.map((val: Reservation, id: number) => (
        <Paper className="w-15 p-t-1 center-children">
            <Grid>
              <Typography>phone: {val.phone}</Typography>
              <Typography>date: {val.reservationDate.getDate()}</Typography>
              <Typography>time: {val.reservationDate.getTime()}</Typography>
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
