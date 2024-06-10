import React from "react";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import UpdateVariations from "src/sections/modals/order/updateVariations";

const Variations = ({ item }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.type);

  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <Box>
        {Array.isArray(item?.personalization_details) ? (
          item?.personalization_details?.map((variation, index) =>
            variation?.formatted_value ? (
              <Typography key={index} variant="body2">
                <b>{variation?.formatted_name}</b>: {variation?.formatted_value}
              </Typography>
            ) : (
              ""
            )
          )
        ) : (
          <Typography variant="body2">
            {item?.personalization_details ? (
              <>
                <b>Personalization:</b> {item?.personalization_details}
              </>
            ) : (
              "-"
            )}
          </Typography>
        )}
      </Box>
      {userType === "Seller" && item.order_status === "on_hold" && (
        <IconButton
          onClick={() =>
            dispatch(setModalState(<UpdateVariations item={item} />))
          }
        >
          <Edit />
        </IconButton>
      )}
    </Stack>
  );
};

export default Variations;
