import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Button, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

interface RestaurantReservationsProps {
  restaurantName: string;
}
interface Reservation {
  id: string;
  userEmail: string;
  restaurantName: string;
  seatCount: number;
  reservationDate: Date;
  status: string;
}
const RestaurantReservations = (props: RestaurantReservationsProps) => {
  const { restaurantName } = props;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [loading, setLoading] = useState<Array<Boolean>>([]);
  const handleDecline = async (reservationId: string) => {
    setLoading((loading) =>
      loading.map((val, idx) =>
        reservationId === reservations[idx].id ? true : val
      )
    );
    await fetch(`/api/reservation/${reservationId}`, {
      method: "POST",
      body: JSON.stringify({
        status: "DECLINED",
      }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading((loading) =>
      loading.map((val, idx) =>
        reservationId === reservations[idx].id ? false : val
      )
    );
    updateReservations();
  };
  const handleAccept = async (reservationId: string) => {
    setLoading((loading) =>
      loading.map((val, idx) =>
        reservationId === reservations[idx].id ? true : val
      )
    );
    await fetch(`/api/reservation/${reservationId}`, {
      method: "POST",
      body: JSON.stringify({
        status: "ACCEPTED",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading((loading) =>
      loading.map((val, idx) =>
        reservationId === reservations[idx].id ? false : val
      )
    );
    updateReservations();
  };
  const updateReservations = () => {
    fetch(
      "/api/reservation?" +
        new URLSearchParams({
          restaurantName: restaurantName,
        })
    )
      .then((res) => {
        return res.json();
      })
      .then((res: Array<any>) => {
        setLoading(res.map(() => true));
        return res.map((val) => ({
          ...val,
          reservationDate: new Date(val.reservationDate),
        }));
      })
      .then((reservations: Array<Reservation>) => {
        setLoading(reservations.map(() => false));
        setReservations(
          reservations.sort(
            (a, b) =>
              Number(a.reservationDate > b.reservationDate) -
              Number(a.reservationDate < b.reservationDate)
          )
        );
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };
  useEffect(() => {
    updateReservations();
  }, []);
  return (
    <Grid container spacing={4}>
      {reservations.map((val: Reservation, idx: number) => (
        <Grid item xs={12}>
          {loading[idx] && (
            <Paper
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10rem", //replace with old height or set standard
              }}
            >
              <CircularProgress />
            </Paper>
          )}
          {!loading[idx] && (
            <Paper
              style={{
                backgroundColor:
                  val.status === "ACCEPTED"
                    ? "#d1f9f0"
                    : val.status === "DECLINED"
                    ? "#ff6961"
                    : "",
              }}
            >
              <Container>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography>email: {val.userEmail}</Typography>
                  <Typography>
                    date: {val.reservationDate.toLocaleDateString()}
                  </Typography>
                  <Typography>
                    time: {val.reservationDate.toLocaleTimeString()}
                  </Typography>
                  <Typography>number of seats:{val.seatCount}</Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onClick={() => handleDecline(val.id)}>
                      Decline
                    </Button>
                    <Button onClick={() => handleAccept(val.id)}>Accept</Button>
                  </div>
                </div>
              </Container>
            </Paper>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantReservations;
