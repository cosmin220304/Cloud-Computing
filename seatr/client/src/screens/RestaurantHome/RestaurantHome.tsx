import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, Button, Card } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import AddReviewForm from "../../components/forms/addReviewForm";
import MenuItem from "../../models/MenuItem";

import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { Container } from "@material-ui/core";
import { Accordion } from "@material-ui/core";
import PaymentDialog from "./components/PaymentDialog";
import { AuthContext } from "../../utils/AuthContext";

interface ItemQuantity {
  item: MenuItem;
  quantity: number;
}
export default function RestaurantHome() {
  let location = useLocation();
  const [authContext, setAuthContext] = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState<any>();
  const [counter, setCounter] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Array<any>>([]);
  const [order, setOrder] = useState<Array<ItemQuantity>>([]);
  const [dateTime, setDateTime] = useState("2017-05-24");

  useEffect(() => {
    console.log(restaurant);
    if (restaurant?.name)
      axios
        .get("/api/review", {
          params: {
            restaurantName: restaurant.name,
          },
          withCredentials: true 
        })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setReviews(data.reviews);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [restaurant]);
  const handleMakeReservation = () => {
    console.log(order);
    let paymentRequired = false;
    order.forEach(({ item, quantity }, idx) => {
      if (quantity !== 0) {
        paymentRequired = true;
      }
    });
    if (paymentRequired) {
      handleOpenPaymentPopUpDialog();
      return;
    }
    axios
      .post(`/api/restaurant/${restaurant.name}/reservation`, {
        reservationDate: dateTime,
        seatCount: counter,
        userPhone: authContext.phoneNumber,
      }, { withCredentials: true })
      .then((res) => {
        alert("created reservation successfuly");
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      });
  };
  const handleOpenPaymentPopUpDialog = () => {
    setOpenPaymentDialog(true);
  };
  const openReviewDialog = () => {
    setOpen(true);
  };
  const closeReviewDialog = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (location.state) {
      setRestaurant(location.state);
      const restaurant: any = location.state;
      setOrder(
        restaurant.menu.map((menuItem: MenuItem) => ({
          item: menuItem,
          quantity: 0,
        }))
      );
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
  if (!restaurant) return null;

  return (
    <>
      <div>
        <div>
          <img
            alt="company background"
            src={restaurant.backgroundHref}
            style={{ width: "100%", maxHeight: "10rem" }}
          />
          <img
            alt="company logo"
            src={restaurant.logoHref}
            style={{
              position: "relative",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              borderWidth: "1rem",
              borderStyle: "solid",
              borderColor: "#DDDDDD",
            }}
          />
        </div>
        <Grid container spacing={3} style={{ marginTop: "-5rem" }}>
          <Grid item xs={12}>
            <Paper>
              <Container>
                <Typography variant="h5">{restaurant.name}</Typography>
                <Typography variant="body1">
                  {restaurant.description}
                </Typography>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Container>
                <Typography variant={"h5"}>Maybe preorder something</Typography>
                {restaurant.menu.map((menuItem: MenuItem, idx) => {
                  const handleAdd = () => {
                    setOrder((prev) =>
                      prev.map(({ item, quantity }, idx2) => {
                        if (item.name === menuItem.name)
                          return { item, quantity: quantity + 1 };
                        return { item, quantity };
                      })
                    );
                  };
                  const handlerRemove = () => {
                    setOrder((prev) =>
                      prev.map(({ item, quantity }, idx2) => {
                        if (item.name === menuItem.name && quantity >= 1)
                          return { item, quantity: quantity - 1 };
                        return { item, quantity };
                      })
                    );
                  };
                  return (
                    <div>
                      <Typography
                        variant={"h5"}
                      >{`${menuItem.name} ${menuItem.price}$`}</Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button onClick={handlerRemove}>
                          <RemoveCircle />
                        </Button>
                        <Typography>{order[idx].quantity}</Typography>
                        <Button onClick={handleAdd}>
                          <AddCircle />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </Container>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <Container>
                <Typography variant="h5">How many people?</Typography>
                <div style={{ display: "flex" }}>
                  <Button onClick={decrease}>
                    <RemoveIcon fontSize="large" />
                  </Button>
                  <Typography variant="h4"> {counter} </Typography>
                  <Button onClick={increase}>
                    <AddCircleIcon color="secondary" fontSize="large" />
                  </Button>
                </div>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Container>
                <Typography variant="h4">When?</Typography>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  value={dateTime}
                  onChange={(event) => {
                    setDateTime(event.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Container>
            </Paper>
          </Grid>
        </Grid>

        <div className="m-t-2">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleMakeReservation}
          >
            <Typography>Make a reservation</Typography>
          </Button>
        </div>
        <div className="m-t-2">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={openReviewDialog}
          >
            <Typography>add review</Typography>
          </Button>
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h5">Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {reviews.map((val) => (
                <div style={{ width: "100%" }}>
                  <Card>
                    <div>{val.description}</div>
                    <div>score:{val.rating}</div>
                    <img src={val.imageHref} />
                  </Card>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <AddReviewForm
        restaurantName={restaurant.name}
        open={open}
        onClose={closeReviewDialog}
      />
      <PaymentDialog
        order={order}
        dialogProps={{
          open: openPaymentDialog,
          onClose: () => {
            setOpenPaymentDialog(false);
          },
        }}
      />
    </>
  );
}
