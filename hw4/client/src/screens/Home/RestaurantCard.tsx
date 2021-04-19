import React, { Paper, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Menu from "../../models/Menu";

interface RestaurantCardProps {
  priceRange: 1 | 2 | 3;
  starRating: 1 | 2 | 3 | 4 | 5;
  name: string;
  description?: string | undefined;
  backgroundHref: string;
  logoHref: string;
  menu: Array<Menu>;
  distance?: string;
}

export default function RestaurantCard(
  restaurantCardProps: RestaurantCardProps
) {
  const {
    priceRange,
    starRating,
    name,
    description,
    logoHref,
    backgroundHref,
    menu,
    distance,
  } = restaurantCardProps;

  return (
    <Paper className="m-1 relative">
      <div className="absolute-center w-5 p-t-2">
        <img
          className="w-5 h-5 cover round border-white"
          alt="company logo"
          src={logoHref}
        />
      </div>
      <img
        className="w-100p h-5 cover"
        alt="company background"
        src={backgroundHref}
      />
      <Paper className="flex-column secondary">
        <div className="p-1 secondary white">
          <Typography variant="h6">{name}</Typography>
          <br />
          <Typography variant="body2">
            {description?.substring(0, 200)}...
          </Typography>
        </div>
        <Paper className="flex space-between p-1">
          <div className="flex">
            <DriveEtaIcon />
            <Typography>{`${distance ?? "??"} min`}</Typography>
          </div>
          <Rating
            icon={<AttachMoneyIcon />}
            name="half-rating-read"
            max={3}
            defaultValue={priceRange}
            precision={1}
            readOnly
          />
          <Rating
            name="half-rating-read"
            max={5}
            defaultValue={starRating}
            precision={0.5}
          />
        </Paper>
      </Paper>
    </Paper>
  );
}
