import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

interface RestaurantReservationsProps {
  restaurantName: string;
}
interface Reservation {
  email: string;
  seatCount: number;
  reservationDate: Date;
}
const RestaurantReservations = (props: RestaurantReservationsProps) => {
  const { restaurantName } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  useEffect(() => {
    fetch(`/api/reservation`)
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
    <Grid container>
      <List>
        {reservations.map((val: Reservation) => (
          <ListItem>
            <Paper>
              <Grid container>
                <Grid item>
                  <Typography>email: {val.email}</Typography>
                  <Typography>date: {val.reservationDate}</Typography>
                  <Typography>time: {val.reservationDate}</Typography>
                  <Typography>number of seats:{val.seatCount}</Typography>
                </Grid>
                <Grid item>
                  <Button>Accept</Button>
                  <Button>Decline</Button>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default RestaurantReservations;
