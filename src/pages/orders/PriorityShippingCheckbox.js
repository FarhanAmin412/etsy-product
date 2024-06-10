import React, { useState } from "react";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getAllOrdersList } from "./requests/local";

const PriorityShippingCheckbox = ({
  id,
  page,
  rowsPerPage,
  orderStatus,
  priorty_mail_shipping,
}) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);
  const [isChecked, setIsChecked] = useState(
    priorty_mail_shipping === 1 ? true : false
  );
  const tabValue = sessionStorage.getItem("activeTabIndex")
    ? sessionStorage.getItem("activeTabIndex")
    : "1";

  const handleCheckbox = async (e, id) => {
    setIsChecked(e.target.checked);
    const payload = {
      order_id: id,
      status: e.target.checked ? 1 : 0,
    };

    try {
      const res = await request.post(`/orders/priorty/mail/shipping`, payload);
      if (res) {
        getAllOrdersList(dispatch, userType, page, rowsPerPage, tabValue);
      }
    } catch (e) {
      toastify("error", e.response.data.message);
    }
  };
  return (
    <FormControlLabel
      sx={{ m: 0, "& span": { fontWeight: "bold" } }}
      label="Priority Mail Shipping"
      labelPlacement="start"
      control={
        <Checkbox
          id={`row-${id}`}
          sx={{
            "& span": {
              cursor: "pointer",
            },
          }}
          disabled={orderStatus === "on hold" ? false : true}
          checked={isChecked}
          onChange={(event) => handleCheckbox(event, id)}
        />
      }
    />
  );
};

export default PriorityShippingCheckbox;
