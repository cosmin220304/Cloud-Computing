import React, { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { useLocation  } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

export default function RestaurantHome () {
  let location = useLocation();
  const [info, setInfo] = useState<any>();
  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    if (location.state) {
      setInfo(location.state);  
    }
    else {
      //todo fetch
    }
  }, [location]);

  const increase = () => {setCounter(prev => ++prev)}
  const decrease = () => {setCounter(prev => --prev)}

  if (!info)
    return null;

  return (
    <div className="m-2 center-children">
      <img
        className="w-100p h-10 cover"
        alt="company background"
        src={info.backgroundHref}
      />
      
      <div className="restaurant-page__top">
        <img
          className="w-5 h-5 cover round border-white"
          alt="company logo"
          src={info.logoHref}
        />
        
        <Paper className="restaurant-page__description">
          <Typography variant="h6">{info.name}</Typography>
          <Typography variant="body2">{info.description}</Typography>
        </Paper> 
      </div>

      <Paper className="restaurant-page__how-many-people">
        <Typography>How many people?</Typography>
        <Button onClick={decrease}>
          <RemoveIcon fontSize="large"/>
        </Button>
        <Typography variant="h4"> {counter} </Typography>
        <Button onClick={increase}>
          <AddCircleIcon color="secondary" fontSize="large"/>
        </Button>
      </Paper> 

      <Paper className="restaurant-page__when">
        <Typography>When?</Typography>
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Paper> 

      <div className="m-t-2">
        <Button variant="contained" color="primary">
          <Typography>Make a reservation</Typography>
        </Button>
      </div>
    </div>
  );
};
