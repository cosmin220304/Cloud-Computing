import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";

const UserReservations = () => {
  const [authContext, setAuthContext] = useContext(AuthContext);
  const userId = authContext.uid;
  const { phoneNumber } = authContext;

  useEffect(() => {
    axios
      .get("/api/reservation", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return <>user reservations</>;
};

export default UserReservations;
