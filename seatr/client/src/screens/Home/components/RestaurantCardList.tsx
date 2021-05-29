import React from "react";
import Restaurant from "../../../models/Restaurant";
import RestaurantCard from "./RestaurantCard";
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  restaurants: Array<Restaurant>;
}

export default function Home({ restaurants }: IProps) {
  return (
    <div className="center-children">
      {restaurants.map((restaurant: Restaurant) => (
        <RestaurantCard
          key={uuidv4()}
          name={restaurant.name}
          description={restaurant.description}
          backgroundHref={restaurant.backgroundHref}
          logoHref={restaurant.logoHref}
          menu={restaurant.menu}
          distance={restaurant.distance}
          priceRange={restaurant.priceRange}
          rating={restaurant.rating}
        />
      ))}
    </div>
  );
}
