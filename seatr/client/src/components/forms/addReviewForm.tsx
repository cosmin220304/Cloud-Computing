import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  Dialog,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import Rating from "@material-ui/lab/Rating";

interface IAddReviewForm {
  open: boolean;
  onClose: any;
  restaurantName?: string;
}
export default function AddReviewForm(props: IAddReviewForm) {
  const formik = useFormik({
    onSubmit: () => {
      let fileToBlob = async (file) =>
        new Blob([new Uint8Array(await file.arrayBuffer())], {
          type: file.type,
        });

      console.log(formik.values);
      const formData = new FormData();
      const file: any = formik.values.file;
      fileToBlob(file)
        .then((blob) => { 
          formData.append("description", formik.values.description);
          formData.append("rating", String(formik.values.rating));
          formData.append("streamfile", blob);
          if (props.restaurantName)
            formData.append("restaurantName", props.restaurantName);
          axios
            .post("/api/review", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          axios
            .post("/api/review", {
              description: formik.values.description,
              stars: formik.values.rating,
              restaurantName: props.restaurantName
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
    },
    initialValues: { description: "", rating: 0, file: null },
  });
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Container>
        <Typography variant="h4">Review</Typography>
        <form className="flex-column" onSubmit={formik.handleSubmit}>
          <TextField
            name="description"
            label="description"
            className="m-2"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <Button variant="contained" component="label" className="m-2">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(event: any) => {
                if (event?.currentTarget?.files[0]) {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }
              }}
              className="form-control"
            />
          </Button>
          <Rating
            className="m-2"
            name="half-rating-read"
            max={5}
            defaultValue={0}
            precision={0.5}
            onChange={(event: any) => {
              formik.setFieldValue("rating", event.target.value);
            }}
          />
          <Button type={"submit"} className="m-2">
            <Typography>Submit</Typography>
          </Button>
        </form>
      </Container>
    </Dialog>
  );
}
