import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography } from "@material-ui/core";
import Reservation from "../../models/Reservation";
import axios from "axios";
import { AuthContext } from "../../utils/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase';
import firebaseConfig from "../../utils/firebaseConfig";

const UserReservation = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [authContext,] = useContext(AuthContext);
  const [messaging, setMessaging] = useState<any>()

  const getAndSetReservations = async () => {
    while (1) {
      try {
        const { data } = await axios.get(`/api/reservation`, { params: { userPhone: authContext.phone, }, withCredentials: true })
        //console.log("reservations => ", data);
        setReservations(data.reverse());

        await new Promise(res => setTimeout(res, 1000))
      } catch (err) {
        console.log(err)
      }
    }
  };

  useEffect(() => {
    getAndSetReservations();
  }, []);

  useEffect(() => {
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
    setMessaging(firebase.messaging()); 
  }, []);

  //tutorial: https://blog.logrocket.com/push-notifications-with-react-and-firebase/
  useEffect(() => {
    if (!messaging) return 
    (async function() {
      try {
        await messaging.requestPermission() 
        
        const currentToken = await messaging.getToken({ vapidKey: process.env.REACT_APP_VAPIDKEY})   
        if (currentToken) {
          console.log("current notification token => ", currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
        
        await messaging.onMessage((payload) => {
          console.log('Message received. ', payload);
        })

      } catch (err) {
        alert(err);
      }
    })()
  }, [messaging]);

  const getStatus = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <b style={{ color: "green" }}> ACCEPTED </b>
      case "DECLINED":
        return <b style={{ color: "RED" }}> DECLINED </b>
      default:
        return <CircularProgress />
    }
  }

  return (
    <>
      <h1 className="center-text">Reservations</h1>
      <div className="flex-column wrap center" >
        {(reservations.length &&
          reservations.map((val: Reservation, id: number) => (
            <Paper className="p-1 m-1 flex-column" style={{ width: "20rem" }}>
              <div><b>restaurant:</b> {val.restaurantName}</div>
              <div><b>date:</b> {val.reservationDate.toString().split("T")[0]}</div>
              <div><b>time:</b> {val.reservationDate.toString().split("T")[1].split(".")[0]}</div>
              <div><b>number of seats:</b> {val.seatCount}</div>
              <div><b>name:</b> {val.userName}</div>
              <div><b>gender:</b> {val.userGender}</div>
              <div><b>phone:</b> {val.userPhone}</div>
              <div><b>orders:</b> {val.order && val.order !== "" ? val.order : "no orders"}</div>
              <br />
              <div className="center-children flex-1">
                {getStatus(val.status)}
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
    </>
  );
}

export default UserReservation
