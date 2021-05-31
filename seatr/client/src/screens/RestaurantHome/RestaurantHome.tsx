import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import AddReviewForm from "../../components/forms/addReviewForm";
import MenuItem from "../../models/MenuItem";
import MenuItemComponent from "./components/MenuItemComponent";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Accordion } from "@material-ui/core";
import PaymentDialog from "./components/PaymentDialog";
import { AuthContext } from "../../utils/AuthContext";
import RestaurantReviews from "./components/RestaurantReviews";

interface ItemQuantity {
  item: MenuItem;
  quantity: number;
}
export default function RestaurantHome() {
  let location = useLocation();

  const [authContext,] = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState<any>();
  const [counter, setCounter] = useState<number>(1);
  const [openReviewDialog, setOpenReviewDialog] = useState<boolean>(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState<boolean>(false);
  const [order, setOrder] = useState<Array<ItemQuantity>>([]);
  const [dateTime, setDateTime] = useState("2017-05-24");

  useEffect(() => {
    if (location.state) {
      setRestaurant(location.state);
      const restaurant: any = location.state;
      setOrder(restaurant.menu.map((menuItem: MenuItem) => ({ item: menuItem, quantity: 0 })));
    } else {
      const restaurantName = location["search"].split("=")[1];
      (async function () {
        const { data } = await axios.get(`/api/restaurant/${restaurantName}`)
        const { restaurant } = data
        setRestaurant(restaurant);
        setOrder(restaurant.menu.map((menuItem: MenuItem) => ({ item: menuItem, quantity: 0 })));
      })()
    }
  }, [location]);
  
  const handleMakeReservation = async () => {
    if (counter === 0) {
      alert("Choose seat count!")
      return;
    }

    const paymentRequired = order.some(o => o.quantity > 0);
    if (paymentRequired) {
      setOpenPaymentDialog(true);
      return;
    }

    try {
      await axios.post(`/api/restaurant/${restaurant.name}/reservation`, {
        reservationDate: dateTime,
        seatCount: counter,
        userPhone: authContext.phoneNumber,
      }, { withCredentials: true })
      alert("created reservation successfuly");
    } catch (err) {
      alert(JSON.stringify(err.response.data));
    }
  };


  if (!restaurant) return null;

  return (
    <div className="restaurant-home">

      <img alt="company background" src={restaurant.backgroundHref} className="restaurant-home__background" />

      <div className="restaurant-home__logo-parent">
        <img alt="company logo" src={restaurant.logoHref} className="restaurant-home__logo" />
      </div>

      <Paper className="restaurant-home__title" >
        <h1> {restaurant.name} </h1>
        {restaurant.description}
      </Paper>

      {order.length > 0 && <Paper className="restaurant-home__menu-items" >
        Preorder the food
            <div>
          {order.map((menuItem: ItemQuantity) => <MenuItemComponent menuItem={menuItem} setOrder={setOrder} key={uuidv4()} />)}
        </div>
      </Paper>}

      <Paper className="restaurant-home__appointment-inputs" >
        <div>When?</div>
        <div>How many people?  </div>
        <TextField id="date" label="Date" type="date" value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
        <div>
          <Button onClick={() => setCounter(prev => prev - 1)}> <RemoveIcon /> </Button>
          {counter}
          <Button onClick={() => setCounter(prev => prev + 1)}> <AddCircleIcon color="secondary" /> </Button>
        </div>
      </Paper>

      <div className="restaurant-home__end-buttons" >
        <Button fullWidth variant="contained" color="primary" onClick={handleMakeReservation}> Make a reservation </Button>
        <Button fullWidth variant="contained" color="primary" onClick={() => setOpenReviewDialog(true)}> Add review  </Button>
      </div>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography variant="h5">Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RestaurantReviews restaurantName={restaurant.name} />
        </AccordionDetails>
      </Accordion>

      <AddReviewForm restaurantName={restaurant.name} open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} />
      <PaymentDialog order={order} dialogProps={{ open: (openPaymentDialog), onClose: () => { setOpenPaymentDialog(false) } }} />
    </div>
  );
}
