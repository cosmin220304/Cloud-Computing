import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import Reservation from "../../models/Reservation";
import axios from "axios";
import { AuthContext } from "../../utils/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';

const UserReservation = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [authContext,] = useContext(AuthContext);

  const getAndSetReservations = async () => {
    while (1) {
      try {
        const { data } = await axios.get(`/api/reservation`, { params: { userPhone: authContext.phone, }, withCredentials: true })
        console.log("reservations => ", data);
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

  const getStatus = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <b style={{ color: "green" }}> ACCEPTED </b>
      case "ACCEPTED":
        return <b style={{ color: "yellow" }}> CANCELED </b>
      case "DECLINED":
        return <b style={{ color: "RED" }}> DECLINED </b>
      default:
        return <CircularProgress />
    }
  }

  return (
    <>
      <h1 className="center-text">Reservations</h1>
      <div className="flex wrap">
        {(reservations.length &&
          reservations.map((val: Reservation, id: number) => (
            <Paper className="p-1 m-1 flex-column center" style={{ width: "20rem" }}>
              <div><b>restaurant:</b> {val.restaurantName}</div>
              <div><b>date:</b> {val.reservationDate.toString().split("T")[0]}</div>
              <div><b>time:</b> {val.reservationDate.toString().split("T")[1].split(".")[0]}</div>
              <div><b>number of seats:</b> {val.seatCount}</div>
              <div><b>name:</b> {val.userName}</div>
              <div><b>gender:</b> {val.userGender}</div>
              <div><b>phone:</b> {val.userPhone}</div>
              <div><b>orders:</b> {val.order && val.order !== "" ? val.order : "no orders"}</div>
              <br />
              {getStatus(val.status)}
            </Paper>
          ))) || (
            <Paper>
              <Typography>
                You don't have any reservations maybe hire a marketing guy
          </Typography>
            </Paper>
          )}
      </div>
    </>
  );
}

export default UserReservation
