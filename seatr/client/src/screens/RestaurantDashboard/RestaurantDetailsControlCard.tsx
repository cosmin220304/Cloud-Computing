import React, { useState } from "react";
import { useFormik } from "formik";
import Restaurant from "../../models/Restaurant";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { AddOutlined, RemoveCircle } from "@material-ui/icons";
import MenuItem from "../../models/MenuItem";
import axios from "axios";

const RestaurantDetailsControlCard = (props: { restaurant: Restaurant }) => {
  const [restaurant, setRestaurant] = useState(props.restaurant);

  const formik = useFormik({
    initialValues: {
      name: restaurant.name,
      description: restaurant.description,
    },
    onSubmit: () => {},
  });

  const handleAddNewMenuItem = () => {
    setRestaurant((prev: Restaurant) => {
      const newMenuItem: MenuItem = {
        name: "",
        quantity: 0,
        price: 0,
      };
      return {
        ...prev,
        menu: [...prev.menu, newMenuItem],
      };
    });
  };
  const handleSaveChanges = () => {
    const cleanRestaurant: any = { ...restaurant };
    delete cleanRestaurant._id;
    delete cleanRestaurant.ownerId;
    delete cleanRestaurant.distance;
    delete cleanRestaurant.__v;
    cleanRestaurant.menu = cleanRestaurant.menu.map((menuItem) => ({
      ...menuItem,
      _id: undefined,
    }));

    axios
      .put(`/api/restaurant/${restaurant.name}`, {
        ...cleanRestaurant,
        ...formik.values,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <Grid item xs={12}>
      <Paper>
        <Container>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              label="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>

          <Typography variant="h4">{"Menu"}</Typography>
          <Grid container spacing={3}>
            {restaurant.menu.map((menuItem, idx) => {
              return (
                <Grid item xs={12} key={idx}>
                  <Paper>
                    <TextField
                      label="Name"
                      value={menuItem.name}
                      onChange={(event) => {
                        const menu = [...restaurant.menu];
                        menu[idx].name = event.target.value;
                        setRestaurant((prev) => ({ ...prev, menu }));
                      }}
                    ></TextField>
                    <TextField
                      label="Quantity"
                      value={menuItem.quantity}
                      onChange={(event) => {
                        const menu = [...restaurant.menu];
                        menu[idx].quantity = Number(event.target.value);
                        setRestaurant((prev) => ({ ...prev, menu }));
                      }}
                    ></TextField>
                    <TextField
                      label="Price"
                      value={menuItem.price}
                      onChange={(event) => {
                        const menu = [...restaurant.menu];
                        menu[idx].price = Number(event.target.value);
                        setRestaurant((prev) => ({ ...prev, menu }));
                      }}
                    ></TextField>
                    <Button
                      onClick={() => {
                        const menu = restaurant.menu.filter(
                          (val, idx2) => idx2 !== idx
                        );
                        setRestaurant((prev) => ({ ...prev, menu }));
                      }}
                    >
                      <RemoveCircle />
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Button onClick={handleAddNewMenuItem}>
                add item <AddOutlined />
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Button onClick={handleSaveChanges}>Save changes</Button>
      </Paper>
    </Grid>
  );
};

export default RestaurantDetailsControlCard;