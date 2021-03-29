import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Typography,
  Grid,
  Dialog,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MenuItemCard from "./MenuItemCard";
import { Create } from "@material-ui/icons";
import CreateReservationDialog from "./CreateReservationDialog";

interface RestaurantCardProps {
  priceRange: 1 | 2 | 3;
  starRating: 1 | 2 | 3 | 4 | 5;
  name: string;
  description?: string | undefined;
  backgroundHref: string;
  logoHref: string;
  menu: Array<MenuItemDto>;
}

interface MenuItemDto {
  photoHref: string;
  name: string;
  price: number;
}

export default function RestaurantCard(
  restaurantCardProps: RestaurantCardProps
) {
  const nOfMinutes = 5;
  const {
    priceRange,
    starRating,
    name,
    description,
    logoHref,
    backgroundHref,
    menu,
  } = restaurantCardProps;
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateReservationDialog open={open} onClose={handleCloseDialog} />
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        elevation={1}
      >
        <div>
          <div style={{ backgroundColor: "red", height: "100px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={backgroundHref}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%,-50%)",
              padding: "1rem",
            }}
          >
            <div
              style={{
                margin: "auto",
                width: "8rem",
                height: "8rem",
                display: "flex",
              }}
            >
              <div
                style={{
                  margin: "auto",
                  maxWidth: "5.5rem",
                  maxHeight: "5.5rem",
                }}
              >
                <img
                  src={logoHref}
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              paddingTop: "3.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <Typography variant={"h6"} style={{ textOverflow: "ellipsis" }}>
              {name}
            </Typography>
            <Typography variant={"body1"} style={{ textOverflow: "ellipsis" }}>
              {description}
            </Typography>
          </div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>More details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Button onClick={handleOpenDialog}>
                  <Typography>Make a reservation</Typography>
                </Button>

                <Grid container spacing={4}>
                  {menu.map((menuItem: MenuItemDto) => (
                    <Grid item xs={12}>
                      <MenuItemCard
                        name={menuItem.name}
                        photoHref={menuItem.photoHref}
                        price={menuItem.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>
          <Paper
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "1rem",
            }}
            elevation={1}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <DriveEtaIcon />
              <Typography>{`${nOfMinutes} min`}</Typography>
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
        </div>
      </Paper>
    </>
  );
}
