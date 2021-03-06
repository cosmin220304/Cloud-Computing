import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Button } from "@material-ui/core";
import { AuthContext } from "../../utils/AuthContext";
import axios from "axios";
import { AddOutlined } from "@material-ui/icons";
import Restaurant from "../../models/Restaurant";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RestaurantDetailsControlCard from "./RestaurantDetailsControlCard";
import RestaurantReservationsTable from "./RestaurantReservationsTable";
 
const RestaurantDashboard = () => {
  const [authContext,] = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    axios
      .get("/api/restaurant", { params: { ownerId: authContext.uid }, withCredentials: true })
      .then((val) => {
        if (val.status !== 200) throw new Error(val.data);
        console.log(val.data, authContext.uid)
        setRestaurants(val.data);
        setSelectedRestaurant(val.data[0]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    console.log("selectedRestaurant=>", selectedRestaurant);
  }, [selectedRestaurant]);

  const onSelectedRestaurantChange = (event) => {
    const restaurantName = event.target.value;
    const _selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.name === restaurantName
    );
    console.log(_selectedRestaurant);
    if (_selectedRestaurant) setSelectedRestaurant({ ..._selectedRestaurant });
  };

  return (
    <div className="m-t-1">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Select a restaurant</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className="p-1">
              {selectedRestaurant && (
                <Select
                  fullWidth
                  value={selectedRestaurant.name}
                  onChange={onSelectedRestaurantChange}
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
                  {restaurants.map((restaurant, idx) => (
                    <MenuItem key={idx} value={restaurant.name}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Restaurant Details</Typography>
          </Grid>
          <Grid item xs={12}>
            {selectedRestaurant && (
              <RestaurantDetailsControlCard restaurant={selectedRestaurant} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h4"}>Reservatations</Typography>
          </Grid>
          <Grid item xs={12}>
            {selectedRestaurant && (
              <RestaurantReservationsTable restaurant={selectedRestaurant} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button>
              <Typography> add a restaurant</Typography>
              <AddOutlined />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default RestaurantDashboard;
