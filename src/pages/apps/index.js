import React, { useState, useEffect } from "react";
import { getScopesData } from "../scopes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import {
  Typography,
  Container,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import Iconify from "src/components/iconify";
import CreateApp from "src/sections/modals/apps/CreateApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getApps } from "./request";
import { toastify } from "src/utils/toast";
import UpdateApp from "src/sections/modals/apps/UpdateApp";

const Apps = () => {
  const dispatch = useDispatch();
  const [revealContent, setRevealContent] = useState(false);

  const userType = useSelector((state) => state.user.user.type);
  const apps = useSelector((state) => state.oAuth.apps);
  const scopes = useSelector((state) => state.oAuth.scopes);

  useEffect(() => {
    getScopesData(dispatch);
    getApps(dispatch);
  }, []);

  const handleButtonClick = () => {
    setRevealContent(!revealContent);
  };

  const copyURLToClipboard = (urlToCopy) => {
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        toastify("success", "Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Container maxWidth="2xl" sx={{ margin: "0px", padding: "0px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Apps</Typography>

        <Button
          variant={"contained"}
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => dispatch(setModalState(<CreateApp scopes={scopes} />))}
        >
          Create App
        </Button>
      </Stack>

      <Box sx={{ my: 4 }}></Box>

      {apps.map((app, index) => {
        let appData = [
          { label: "Name", value: app.name, key: "name" },
          {
            label: "Redirect URI",
            value: app.redirect_uri,
            key: "redirect_uri",
          },
          { label: "Client ID", value: app.client_id, key: "client_id" },
          {
            label: "Client Secret",
            value: revealContent
              ? app.client_secret
              : [...Array(20)].map((item, index) => (
                  <Iconify icon="icon-park:dot" />
                )),
            key: "client_secret",
          },
          {
            label: "Scopes",
            value: (
              <ul style={{ marginLeft: "20px" }}>
                {app.scopes.map((scope, index) => (
                  <li key={index}>{scope}</li>
                ))}
              </ul>
            ),
            key: "scopes",
          },
        ];

        let oAuthURL = `/app/oauth2/auth?scope=${app?.scopes?.join(
          "%20"
        )}&response_type=code&access_type=offline&redirect_uri=${
          app?.redirect_uri
        }&decline_uri=https://dev.hellocustom.io/oauth/decline/redirect?type=icp&client_id=${
          app?.client_id
        }&state=abc&type=icp`;

        return (
          <Accordion
            variant="outlined"
            key={`${app?.id} - ${index}`}
            sx={{
              "& .MuiAccordionSummary-content": {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle2">
                Access Key {index + 1}
              </Typography>
              <Typography variant="subtitle2">
                Created {new Date().getFullYear()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mx: 4 }}>
              {/* testing */}
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={2}
              >
                <Link to={oAuthURL} target="_blank">
                  <Button variant={"contained"} size="small">
                    Open Consent screen
                  </Button>
                </Link>
                <Tooltip title="Copy oAuth URL">
                  <IconButton
                    onClick={() =>
                      copyURLToClipboard("http://localhost:3000" + oAuthURL)
                    }
                  >
                    <Iconify icon={"ph:copy-bold"} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Update App">
                  <IconButton
                    onClick={() =>
                      dispatch(setModalState(<UpdateApp app={app} />))
                    }
                  >
                    <Iconify icon={"eva:edit-fill"} />
                  </IconButton>
                </Tooltip>
              </Stack>
              {/* testing */}

              {appData?.map((item, index) => (
                <Stack direction="column" mb={2} key={index}>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.label}
                  </Typography>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    sx={{ marginTop: "12px" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        backgroundColor: "aliceblue",
                        minWidth: "460px",
                        maxWidth: "fit-content",
                        padding: "8px 20px",
                        borderRadius: "8px",
                      }}
                    >
                      {item?.value}
                    </Typography>
                    {item?.key === "client_secret" && (
                      <>
                        <Iconify
                          icon={
                            revealContent ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                          onClick={handleButtonClick}
                        />

                        <Button
                          variant="contained"
                          size="small"
                          onClick={copyURLToClipboard}
                        >
                          Copy
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default Apps;
