import React from "react";
import Iconify from "src/components/iconify/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Button } from "@mui/material";
import { toastify } from "src/utils/toast";
import { uploadToShipOrders } from "./requests/local/uploadCSVFile";

const UploadFiles = () => {
  const dispatch = useDispatch();
  const shipOrders = useRef(null);
  const userType = useSelector((state) => state.user.user.type);

  async function onUploading(e, type) {
    const file = e.target.files[0];

    if (file) {
      const tempExtention = file.name.split(".");
      const fileExtention =
        tempExtention[tempExtention.length - 1].toLowerCase();

      const allowedFileExtentions = ["csv", "xlsx", "ods"];

      if (!allowedFileExtentions.includes(fileExtention)) {
        toastify(
          "warning",
          "Please upload valid file type. File type allowed: CSV and XLSX"
        );

        return;
      }

      if (file.size > 10000000) {
        toastify("warning", "File size should be less than 10MB");

        return;
      }

      uploadToShipOrders(dispatch, userType, file);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="inherit"
        sx={{ mr: 2 }}
        startIcon={<Iconify icon="ic:round-upload" />}
        onClick={(e) => {
          shipOrders.current.click();
        }}
      >
        Ship Orders
      </Button>
      <input
        type="file"
        ref={shipOrders}
        onClick={(e) => {
          e.target.value = null;
        }}
        onChange={(e) => onUploading(e)}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadFiles;
