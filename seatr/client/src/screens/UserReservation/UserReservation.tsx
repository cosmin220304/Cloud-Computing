import React, { useEffect, useState, useContext } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import Reservation from "../../models/Reservation";
import axios from "axios";
import { AuthContext } from "../../utils/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase';
import firebaseConfig from "../../utils/firebaseConfig";
import * as serviceWorker from '../../serviceWorker'

const UserReservation = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [authContext,] = useContext(AuthContext);
  const [messaging, setMessaging] = useState<any>()

  const getAndSetReservations = async () => {
    while (1) {
      try {
        const { data } = await axios.get(`/api/reservation`, { params: { userPhone: authContext.phone, }, withCredentials: true })
        //console.log("reservations => ", data);
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
        
        const currentToken = await messaging.getToken({ vapidKey: 'BHJ1aMQSkNa7KLvY62Y-lMrIWTZ4hXS3q4czNsuXuF2S4dg2W46cZPCSv1s1NZx6giJbxoIR_nvN_stroTVy0TM'})   
        if (currentToken) {
          console.log("current notification token => ", currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
        
        await messaging.onMessage((payload) => {
          console.log('Message received. ', payload.notification);
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
