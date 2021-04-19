import React, { useState, useEffect } from "react";
import { Paper, InputBase } from "@material-ui/core";
import { MenuOutlined, SearchOutlined } from "@material-ui/icons";
import Restaurant from "../../models/Restaurant";
import RestaurantCardList from "./RestaurantCardList";

import { restaurants_data } from "../../utils/dummy_data";

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
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   fetch(
    //     'https://us-central1-hw3-cloud-computing-308510.cloudfunctions.net/h3-server/api/restaurant?' +
    //       new URLSearchParams({
    //         lat: String(position.coords.latitude),
    //         lng: String(position.coords.longitude),
    //       }),
    //     {
    //       mode: 'no-cors',
    //     }
    //   )
    //     .then((res) => {
    //       return res.json()
    //     })
    //     .then((restaurants: Array<Restaurant>) => {
    //       console.log(restaurants)
    //       setRestaurants(restaurants)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // })
    setRestaurants(restaurants_data);
  }, []);

  const updateSearchText = (evt: any) => {
    setSearchText(evt.target.value);
  };

  const makeSearch = () => {
    setFilteredRestaurants(
      restaurants.filter((restaurant: Restaurant) =>
        restaurant.name.startsWith(searchText)
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
