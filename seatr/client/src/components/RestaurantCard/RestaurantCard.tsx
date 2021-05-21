import React, { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Menu from "../../models/Menu";
import Logo from "./Logo";
import Background from "./Background";
import Description from "./Description";
import Footer from "./Footer";

interface IProps {
  priceRange: 1 | 2 | 3;
  starRating: 1 | 2 | 3 | 4 | 5;
  name: string;
  description?: string | undefined;
  backgroundHref: string;
  logoHref: string;
  menu: Array<Menu>;
  distance?: string;
}

export default function RestaurantCard({
  priceRange,
  starRating,
  name,
  description,
  logoHref,
  backgroundHref,
  menu,
  distance,
}: IProps) {

  let history = useHistory();

  const goToDetails = () => {
    history.push({
      pathname: "/restaurant",
      search: `?name=${name}`,
      state: {
        priceRange,
        starRating,
        name,
        description,
        logoHref,
        backgroundHref,
        menu,
        distance,
      },
    });
  };

  return (
    <div className="restaurant-card">
      <div onClick={goToDetails}>
        <Logo logoHref={logoHref} />
      </div>
      <div onClick={goToDetails}>
        <Background backgroundHref={backgroundHref} />
      </div>
      <Paper className="flex-column">
        <div onClick={goToDetails}>
          <Description name={name} description={description} />
        </div>
        <Footer
          priceRange={priceRange}
          starRating={starRating}
          distance={distance}
        />
      </Paper>
    </div>
  );
}
