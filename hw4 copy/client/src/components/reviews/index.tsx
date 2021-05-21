import { Card, Dialog, DialogProps, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewsDialog = ({
  dialogProps,
  restaurantName,
}: {
  dialogProps: DialogProps;
  restaurantName: string;
}) => {
  const [reviews, setReviews] = useState<Array<any>>([]);

  useEffect(() => {
    axios
      .get("/api/review", {
        params: {
          restaurantName,
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setReviews(data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Dialog {...dialogProps}>
      <Typography>Reviews</Typography>
      <div>
        {reviews.map((val) => (
          <Card>
            <div>{val.description}</div>
            <div>score:{val.rating}</div>
            <img src={val.imageHref} />
          </Card>
        ))}
      </div>
    </Dialog>
  );
};
export default ReviewsDialog;
