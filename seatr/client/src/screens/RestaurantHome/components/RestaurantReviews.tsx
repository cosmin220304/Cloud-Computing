import { Card } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  restaurantName: String
}

const RestaurantReviews = ({ restaurantName }: IProps) => {
  const [reviews, setReviews] = useState<Array<any>>([]);

  useEffect(() => {
    if (!restaurantName) return;

    const init = async () => {
      try {
        const { data } = await axios.get("/api/review", { params: { restaurantName }, withCredentials: true })
        setReviews(data.reviews);
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    }
    init();

  }, [restaurantName]);

  return (
    <div className="flex-column gap-1 w-100p">
      {reviews.map((h) => (
        <Card className="p-1" key={uuidv4()}>
          <div className="flex-align-items" >
            <div className="flex-1">{h.personName}</div>
            <div>
              <Rating name="half-rating-read" max={5} defaultValue={h.stars} precision={0.5} readOnly />
            </div>
          </div>
          <hr />
          {h.description && <q>{h.description}</q>}
          {h.imageHref && <img src={h.imageHref} alt="review img" />}
        </Card>
      ))}
    </div>
  )
}

export default RestaurantReviews
