import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PaymentCards from "../cart/payment";
import Wallet from "./Wallet";
import ChargeHistory from "src/components/charge-history/ChargeHistory";
import { Box, Container, Typography, Card, Stack } from "@mui/material";

const Settings = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          My Settings
        </Typography>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs">
              <Tab label="Payments" value="1" />
              <Tab label="Wallet" value="2" />
              <Tab label="Charge History" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "20px 0px" }}>
            <Container maxWidth="xl" sx={{ margin: "0px", padding: "0px" }}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                Payment Details
              </Typography>
              <Container>
                <Card>
                  <PaymentCards />
                </Card>
              </Container>
            </Container>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "20px 0px" }}>
            <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                My Wallet
              </Typography>
              <Stack direction={"row"} justifyContent={"center"}>
                <Card sx={{ width: "80%" }}>
                  <Wallet />
                </Card>
              </Stack>
            </Container>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: "20px 0px" }}>
            <Container maxWidth="xl" sx={{ margin: "0px", padding: "0px" }}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                My History
              </Typography>
              <Card sx={{ p: 4 }}>
                <ChargeHistory />
              </Card>
            </Container>
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default Settings;
