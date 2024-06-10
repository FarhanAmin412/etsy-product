import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function GuestFooter() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: "auto",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Box sx={{ flexGrow: 1 }} my={1} > 
        <Grid container spacing={2}>
          <Grid item xs={12} alignSelf="center">
            <Item>
              {" "}
              <Typography variant="caption" color="initial">
                2023 © Inner Circle Prints. All Rights Reserved.{" "}
              </Typography>
              <Typography variant="caption" color="initial">
                The term 'Etsy' is a trademark of Etsy, Inc. This application
                uses the Etsy API but is not endorsed or certified by Etsy, Inc.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
