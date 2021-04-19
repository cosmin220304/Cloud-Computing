import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  Dialog,
  TextField,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

interface IAddReviewForm {
  open: boolean;
  onClose: any;
}
export default function AddReviewForm(props: IAddReviewForm) {
  const formik = useFormik({
    onSubmit: () => {},
    initialValues: { description: "", rating: 0 },
  });
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Container>
        <form className="flex-column" onSubmit={formik.handleSubmit}>
          <TextField
            label="description"
            className="m-2"
            value={formik.values.description}
          />
          <Button variant="contained" component="label" className="m-2">
            Upload Image
            <input type="file" hidden />
          </Button>
          <Rating
            className="m-2"
            name="half-rating-read"
            max={5}
            defaultValue={0}
            precision={0.5}
          />
          <Button type={"submit"} className="m-2">
            <Typography>Submit</Typography>
          </Button>
        </form>
      </Container>
    </Dialog>
  );
}
