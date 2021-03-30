import {
  DialogProps,
  Dialog,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useFormik } from "formik";
import React from "react";

const CreateReservationDialog = (props: DialogProps) => {
  const restaurantName = "la cao";
  const formik = useFormik({
    initialValues: {
      date: null,
      seatCount: 1,
      email: "",
    },
    onSubmit: () => {
      fetch(`/api/restaurant/${restaurantName}/reservation`, {
        method: "POST",
        body: JSON.stringify({
          reservationDate: formik.values.date,
          seatCount: formik.values.seatCount,
          userEmail: formik.values.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      console.log(formik.values);
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog {...props}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} style={{ padding: "1rem" }}>
            <Grid item xs={12}>
              <TextField
                label="email"
                name="email"
                type="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Date"
                value={formik.values.date}
                onChange={(value) => {
                  formik.setFieldValue("date", value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardTimePicker
                fullWidth
                margin="normal"
                label="Time"
                value={formik.values.date}
                onChange={(value) => {
                  formik.setFieldValue("date", value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="seatCount"
                label={"Seat count"}
                type={"number"}
                value={formik.values.seatCount}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>{" "}
    </MuiPickersUtilsProvider>
  );
};
export default CreateReservationDialog;
