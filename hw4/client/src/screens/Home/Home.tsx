import React, { useState, useEffect } from "react";
import { Paper, InputBase } from "@material-ui/core";
import { MenuOutlined, SearchOutlined } from "@material-ui/icons";
import Restaurant from "../../models/Restaurant";
import RestaurantCardList from "./RestaurantCardList";
import axios from 'axios'; 

export default function Home() {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Array<Restaurant>
  >([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      axios.get(`/api/restaurant?lat=${coords.latitude}&lng=${coords.longitude}`)
        .then((res) => {
          console.log(res.data.data)
          console.log(typeof(res.data.dat))
          const newRestaurants = res.data.data.filter(r => r.name)
          setRestaurants(newRestaurants)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, []);

  const updateSearchText = (evt: any) => {
    setSearchText(evt.target.value);
  };

  const makeSearch = () => {
    setFilteredRestaurants(
      restaurants.filter((restaurant: Restaurant) =>
        restaurant.name && restaurant.name.startsWith(searchText)
      )
    );
  };

  return (
    <div className="home-page">
      <Paper className="home-page_search">
        <InputBase onChange={updateSearchText} fullWidth />
        <div className="w-2" onClick={makeSearch}>
          <SearchOutlined />
        </div>
        <div className="w-2">
          <MenuOutlined />
        </div>
      </Paper>
      <RestaurantCardList restaurants={filteredRestaurants} />
    </div>
  );
}
