import React, { Paper, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

interface IProps {
  priceRange: number;
  starRating: number;
  distance?: any;
}

export default function Footer({ priceRange, starRating, distance }: IProps) {
  return (
    <Paper className="restaurant-card__footer">
      <div>
        <div className="flex center">
          <DriveEtaIcon />
          <Typography style={{ fontWeight: 600 }}>{`${distance ? Math.round(distance * 10) / 10 : "??"} min`}</Typography>
        </div>
        <div className="flex center">
          <Rating
            icon={<AttachMoneyIcon />}
            name="half-rating-read"
            max={3}
            defaultValue={priceRange}
            precision={1}
            readOnly
          />
        </div>
      </div>
      <div className="flex center">
        <Rating
          name="half-rating-read"
          max={5}
          defaultValue={starRating}
          precision={0.5}
          readOnly
        />
      </div>
    </Paper>
  );
}
