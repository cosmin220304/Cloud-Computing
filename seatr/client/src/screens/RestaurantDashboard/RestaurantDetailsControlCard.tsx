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
import { AddOutlined } from "@material-ui/icons";
import MenuItem from "../../models/MenuItem";

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
      </Paper>
    </Grid>
  );
};

export default RestaurantDetailsControlCard;
