import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Card } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import AddReviewForm from "../../components/forms/addReviewForm";
import MenuItem from "../../models/MenuItem";

import axios from "axios";

interface ItemQuantity {
  item: MenuItem;
  quantity: number;
}
export default function RestaurantHome() {
  let location = useLocation();
  const [info, setInfo] = useState<any>();
  const [counter, setCounter] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Array<any>>([]);
  const [order, setOrder] = useState<Array<ItemQuantity>>([]);

  useEffect(() => {
    if (info?.name)
      axios
        .get("/api/review", {
          params: {
            restaurantName: info.name,
          },
        })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setReviews(data.reviews);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [info]);
  const handleMakeReservation = () => {};

  const openReviewDialog = () => {
    setOpen(true);
  };
  const closeReviewDialog = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (location.state) {
      setInfo(location.state);
    } else {
      //todo fetch
    }
  }, [location]);

  const increase = () => {
    setCounter((prev) => ++prev);
  };
  const decrease = () => {
    setCounter((prev) => --prev);
  };
  if (!info) return null;

  return (
    <>
      <div className="m-2 center-children">
        <img
          className="w-100p h-10 cover"
          alt="company background"
          src={info.backgroundHref}
        />

        <div className="restaurant-page__top">
          <img
            className="w-5 h-5 cover round border-white"
            alt="company logo"
            src={info.logoHref}
          />

          <Paper className="restaurant-page__description">
            <Typography variant="h6">{info.name}</Typography>
            <Typography variant="body2">{info.description}</Typography>
          </Paper>
        </div>

        <Paper className="restaurant-page__how-many-people">
          <Typography>How many people?</Typography>
          <Button onClick={decrease}>
            <RemoveIcon fontSize="large" />
          </Button>
          <Typography variant="h4"> {counter} </Typography>
          <Button onClick={increase}>
            <AddCircleIcon color="secondary" fontSize="large" />
          </Button>
        </Paper>

        <Paper className="restaurant-page__when">
          <Typography>When?</Typography>
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>

        <div className="m-t-2">
          <Button
            variant="contained"
            color="primary"
            onClick={handleMakeReservation}
          >
            <Typography>Make a reservation</Typography>
          </Button>
        </div>

        <div className="m-t-2">
          <Button
            variant="contained"
            color="primary"
            onClick={openReviewDialog}
          >
            <Typography>add review</Typography>
          </Button>
        </div>
        <div className="m-t-2">
          {reviews.map((val) => (
            <Card>
              <div>{val.description}</div>
              <div>score:{val.rating}</div>
              <img src={val.imageHref} />
            </Card>
          ))}
        </div>
      </div>
      <AddReviewForm
        restaurantName={info.name}
        open={open}
        onClose={closeReviewDialog}
      />
    </>
  );
}
