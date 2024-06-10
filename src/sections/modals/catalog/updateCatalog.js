import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Stack,
  TextField,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import { StyledLoadingButton } from "src/pages/auth/login/Login.styles";
import { useDispatch, useSelector } from "react-redux";
import { PhotoCamera } from "@mui/icons-material";
import { toastify } from "src/utils/toast";
import { updateCatalog } from "src/pages/catalog/request";
import { schema } from "./schema";
import { SmallImage } from "src/theme/globalStyles";

export default function UpdateCatalogForm({ product }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [defaultImage, setDefaultImage] = useState();
  const fileType = product.cover.match(/\/([^\/?#]+)[^\/]*$/)[1].split(".")[1];
  const [catalogImage, setCatalogImage] = useState([
    { file: product.cover, name: `${product.name}.${fileType}` },
  ]);
  const loading = useSelector((state) => state.user.loadingButton);
  const userType = useSelector((state) => state.user.user.type);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: product.name,
      description: product.desc,
      price: product.price,
      comparePrice: product.comparPrice,
      shipPrice: product.shipPrice,
      sku: product.sku,
      quantity: product.quantity,
      url: product.url,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    createFile(product.cover);
  }, []);

  async function createFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "test.jpg", metadata);

    setDefaultImage([file]);
  }

  const onSubmitHandler = (data) => {
    let formData = new FormData();

    formData.append("title", data.title);
    formData.append("handle", `${data.title}-handle`);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("compare_price", data.comparePrice);
    formData.append("shipping_price", data.shipPrice);
    formData.append("sku", data.sku);
    formData.append("quantity", data.quantity);
    formData.append("url", data.url);
    
    if (files.length > 0) {
      formData.append("images[]", files[0]);
    } else {
      formData.append("images[]", defaultImage[0]);
    }

    updateCatalog(dispatch, formData, product.id, userType);
    reset();
  };

  async function onUploading(e) {
    const file = e.target.files[0];
    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention = tempExtention[tempExtention.length - 1];
      const allowedFileExtentions = ["png", "jpg", "jpeg", "jfif"];
      if (!allowedFileExtentions.includes(fileExtention)) {
        toastify("warning", "Please upload valid file type");
        return;
      }

      if (file.size > 10000000) {
        toastify("warning", "File size should be less than 10MB");
        return;
      } else {
        setCatalogImage([{ file: URL.createObjectURL(file), name: file.name }]);
        setFiles([...files, file]);
      }
    }
  }

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
            {...register("price")}
            size="small"
            label="Price"
            type="text"
          />
          {errors.price?.message && (
            <Alert severity="error">{errors.price?.message}</Alert>
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
          {catalogImage?.map((image, index) => (
            <Stack direction={"row"} alignItems="center" key={index}>
              <SmallImage
                component="img"
                image={image.file}
                alt="Catalog image"
              />
              {image.name}
            </Stack>
          ))}
          <Button variant="contained" component="label" color="inherit">
            <PhotoCamera sx={{ mr: 1 }} /> Upload File
            <input type="file" hidden onChange={onUploading} />
          </Button>
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
          Update product
        </StyledLoadingButton>
      </form>
    </>
  );
}
