import React, { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Menu from "../../../../models/MenuItem";
import Logo from "./Logo";
import Background from "./Background";
import Description from "./Description";
import Footer from "./Footer";

interface IProps {
  priceRange: number;
  name: string;
  description?: string | undefined;
  backgroundHref: string;
  logoHref: string;
  menu: Array<Menu>;
  distance?: string;
  rating: number;
}

export default function RestaurantCard({
  priceRange,
  name,
  description,
  logoHref,
  backgroundHref,
  menu,
  distance,
  rating,
}: IProps) {
  let history = useHistory();

  const goToDetails = () => {
    history.push({
      pathname: "/restaurant",
      search: `?name=${name}`,
      state: {
        priceRange,
        name,
        description,
        logoHref,
        backgroundHref,
        menu,
        distance,
        rating
      },
    });
  };

  return (
    <div className="restaurant-card">
      <div onClick={goToDetails}>
        <Logo logoHref={logoHref} />
      </div>
      <div onClick={goToDetails} className="pointer">
        <Background backgroundHref={backgroundHref} />
      </div>
      <Paper className="flex-column pointer" onClick={goToDetails}>
        <Description name={name} description={description} />
        <Footer
          priceRange={priceRange}
          starRating={rating}
          distance={distance}
        />
      </Paper>
    </div>
  );
}
