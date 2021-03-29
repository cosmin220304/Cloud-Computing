import React, { useState, useEffect } from "react";
import { Container, Paper, TextField, Grid, Button } from "@material-ui/core";
import { MenuOutlined, SearchOutlined } from "@material-ui/icons";
import RestaurantCard from "./components/RestaurantCard";
import { useFormik } from "formik";

interface MenuItemDto {
  photoHref: string;
  name: string;
  price: number;
}

interface Restaurant {
  menu: Array<MenuItemDto>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
}
interface RestaurantFinderProps {}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function RestaurantFinder(props: RestaurantFinderProps) {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const formik = useFormik({
    initialValues: {
      searchString: "",
    },
    onSubmit: () => {},
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        "/api/restaurant?" +
          new URLSearchParams({
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
          })
      )
        .then((res) => {
          return res.json();
        })
        .then((restaurants: Array<Restaurant>) => {
          console.log(restaurants);
          setRestaurants(restaurants);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <>
      <div style={{ height: "1rem" }} />
      <Paper>
        <Container
          style={{
            padding: "0.5rem",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            name={"searchString"}
            label={"search"}
            value={formik.values.searchString}
            onChange={formik.handleChange}
            fullWidth
          />
          <Button disabled={true} onClick={useForceUpdate}>
            <SearchOutlined />
          </Button>
          <Button disabled={true}>
            <MenuOutlined />
          </Button>
        </Container>
      </Paper>
      <div style={{ height: "1rem" }} />
      <Grid container spacing={3}>
        {restaurants
          .filter((restaurant: Restaurant) =>
            restaurant.name.startsWith(formik.values.searchString)
          )
          .map((restaurant: Restaurant) => (
            <Grid item xs={12}>
              <RestaurantCard
                name={restaurant.name}
                description={restaurant.description}
                backgroundHref={restaurant.backgroundHref}
                logoHref={restaurant.logoHref}
                menu={restaurant.menu}
                distance={restaurant.distance}
                priceRange={2}
                starRating={4}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
