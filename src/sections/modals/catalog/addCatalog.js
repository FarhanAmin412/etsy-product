import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  TextField,
  Alert,
  CircularProgress,
  CardMedia,
  Typography,
} from "@mui/material";
import { schema } from "./schema";
import { StyledLoadingButton } from "src/pages/auth/login/Login.styles";
import { useDispatch, useSelector } from "react-redux";
import { toastify } from "src/utils/toast";
import { addCatalog } from "src/pages/catalog/request";
import { StyledDropzone } from "../posts/AddPost";
import { useDropzone } from "react-dropzone";
import LibraryImg from "../../../assets/images/library.png";

export default function AddCatalogForm(props) {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const loading = useSelector((state) => state.user.loadingButton);
  const userType = useSelector((state) => state.user.user.type);

  const onDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    let formData = new FormData();

    formData.append("title", data.title);
    formData.append("handle", `${data.title}-handle`);

    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("no_of_graphics", data.noOfGraphics);
    formData.append("compare_price", data.comparePrice);
    formData.append("shipping_price", data.shipPrice);
    formData.append("sku", data.sku);
    formData.append("quantity", data.quantity);
    formData.append("url", data.url);

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }
    }

    if (images.length > 0) {
      addCatalog(dispatch, formData, reset, userType);
    } else {
      toastify("warning", "Please upload a file");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <TextField
            {...register("title")}
            size="small"
            label="Title"
            type="text"
            required
          />
          {errors.title?.message && (
            <Alert severity="error">{errors.title?.message}</Alert>
          )}

          <TextField
            {...register("description")}
            size="small"
            label="Description"
            type="text"
          />
          {errors.description?.message && (
            <Alert severity="error">{errors.description?.message}</Alert>
          )}

          <TextField
            {...register("noOfGraphics")}
            size="small"
            label="No. of Graphics"
            type="text"
            required
          />
          {errors.noOfGraphics?.message && (
            <Alert severity="error">{errors.noOfGraphics?.message}</Alert>
          )}

          <TextField
            {...register("price")}
            size="small"
            label="Price"
            type="text"
            required
          />
          {errors.price?.message && (
            <Alert severity="error">{errors.pricing?.message}</Alert>
          )}

          <TextField
            {...register("comparePrice")}
            size="small"
            label="Compare Price"
            type="text"
          />

          <TextField
            {...register("shipPrice")}
            size="small"
            label="Shipping Price"
            type="text"
          />
          {errors.shipPrice?.message && (
            <Alert severity="error">{errors.shipPrice?.message}</Alert>
          )}

          <TextField
            {...register("sku")}
            size="small"
            label="SKU"
            type="number"
          />
          {errors.sku?.message && (
            <Alert severity="error">{errors.sku?.message}</Alert>
          )}
          <TextField
            {...register("quantity")}
            size="small"
            label="Qty"
            type="number"
          />
          {errors.quantity?.message && (
            <Alert severity="error">{errors.quantity?.message}</Alert>
          )}

          <TextField
            {...register("url")}
            size="small"
            label="URL"
            type="string"
          />

          <StyledDropzone elevation={3} {...getRootProps()}>
            <input {...getInputProps()} multiple />
            <img src={LibraryImg} alt="library" style={{ width: 120 }} />
            <div>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Drag Your Files Here
              </Typography>
            </div>
          </StyledDropzone>

          <Stack direction={"row"} spacing={3} sx={{ my: 4 }} flexWrap={"wrap"}>
            {images?.map((file, index) => {
              return (
                <CardMedia
                  component={"img"}
                  image={URL.createObjectURL(file)}
                  alt={file.name}
                  sx={{ width: "80px", height: "80px", m: 2 }}
                />
              );
            })}
          </Stack>
        </Stack>

        <StyledLoadingButton
          sx={{ marginTop: "30px" }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
        >
          {props.button_title}
        </StyledLoadingButton>
      </form>
    </>
  );
}
