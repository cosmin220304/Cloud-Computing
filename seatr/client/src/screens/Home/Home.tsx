import React, { useState, useEffect } from "react";
import { Paper, InputBase } from "@material-ui/core";
import { MenuOutlined, SearchOutlined } from "@material-ui/icons";
import Restaurant from "../../models/Restaurant";
import RestaurantCardList from "./components/RestaurantCardList";
import axios from "axios";
import { Switch } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Array<Restaurant>
  >([]);
  const [searchText, setSearchText] = useState<string>("");
  const [enableFilter, setenableFilter] = useState<Boolean>(false);
  const [covidFilter, setCovidFilter] = useState<Boolean>(false);

  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      axios
        .get(`/api/restaurant?lat=${coords.latitude}&lng=${coords.longitude}`, { withCredentials: true })
        .then(({data}) => {
          console.log(data) 
          setRestaurants(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const updateSearchText = (evt: any) => {
    const text = evt.target.value;
    setSearchText(text);
    makeSearch();
  };

  const makeSearch = () => {
    let filteredRestaurant = restaurants.filter(
      (restaurant: Restaurant) =>
        restaurant.name.includes(searchText) ||
        restaurant.tags.some(t => t.includes(searchText))
    )
    if (covidFilter) {
      filteredRestaurant = filteredRestaurant.filter(
        (restaurant: Restaurant) => restaurant.currentAvailableSeats > 3/10 * restaurant.maxSeatCount
      )
    }
    setFilteredRestaurants(filteredRestaurant);
  }; 

  useEffect(() => {
    makeSearch();
  }, []);

  useEffect(() => {
    makeSearch();
  }, [covidFilter]);

  const sortBy = ({ value }) => {
    let orderedRestaurant = [...restaurants];
    switch (value) {
      case "distance":
        orderedRestaurant.sort((r1, r2) => { 
          if (!r1.distance) return -1;
          if (!r2.distance) return -1;
          return r1.distance > r2.distance ? 1 : -1 
        })
        break;
      case "rating":
        orderedRestaurant.sort((r1, r2) => r1.rating < r2.rating ? 1 : -1)
        break;
      case "price":
        orderedRestaurant.sort((r1, r2) => r1.priceRange > r2.priceRange ? 1 : -1)
        break;
      default:
        throw new Error("invalid sort by value")
    }
    setFilteredRestaurants(orderedRestaurant);
  }

  return (
    <div className="home-page">
      <Paper className="home-page_search">
        <InputBase onChange={updateSearchText} fullWidth />
        <div className="w-2" onClick={makeSearch} className="pointer">
          <SearchOutlined />
        </div>
        <div className="w-2" onClick={() => setenableFilter(prev => prev ? false : true)}className="pointer">
          <MenuOutlined />
        </div>
      </Paper>
      {enableFilter && <Paper className="home-page_filter pointer">
       <Dropdown 
        options={["distance", "rating", "price"]}  
        value={"distance"}  
        onChange={sortBy}
       />
       <Switch color="success" onChange={()=>{setCovidFilter(prev => prev ? false : true)}} > 
        Covid 
       </Switch>
      </Paper>}
      <RestaurantCardList restaurants={filteredRestaurants} />
    </div>
  );
}
