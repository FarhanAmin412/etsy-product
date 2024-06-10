import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { checkURL, getLink, getUploadedImage } from "./utils";
import { SmallImage } from "src/theme/globalStyles";

const OrderGraphics = ({ item }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Jewelry Graphics
      </Typography>
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={2}
        justifyContent={"center"}
      >
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          Pendant graphic
        </Typography>
        {checkURL(item?.graphic_image) === "url" ? (
          <a
            href={item?.graphic_image ? getLink(item?.graphic_image) : ""}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" size="small">
              Edit Graphic
            </Button>
          </a>
        ) : (
          <SmallImage
            image={getUploadedImage(item, "graphic")}
            component={"img"}
            alt="graphic"
          />
        )}
      </Stack>
      <Box sx={{ my: 4 }}></Box>
      {item?.notecard_image && (
        <Stack
          direction="row"
          alignItems={"center"}
          spacing={2}
          justifyContent={"center"}
        >
          <Typography variant="subtitle1">Notecard graphic</Typography>
          {checkURL(item?.notecard_image) === "url" ? (
            <a
              href={item?.notecard_image ? getLink(item?.notecard_image) : ""}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="contained" size="small">
                Edit Graphic
              </Button>
            </a>
          ) : (
            <SmallImage
              image={getUploadedImage(item, "notecard")}
              component={"img"}
              alt="graphic"
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default OrderGraphics;
