import React, { useState, useEffect } from "react";
import { Add, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";
import tumblers from "../../assets/icons/tumbler_50x50.svg";
import ornaments from "../../assets/icons/ornaments.svg";
import Jewelry from "../../assets/icons/PendantSVG1.svg";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "src/redux/actions/modalActions";
import { loadingAction, loadingBtnAction } from "src/redux/actions/userActions";
import SetProcessingTime from "src/sections/modals/processingTime/SetProcessingTime";
import UpdateProcessingTime from "src/sections/modals/processingTime/UpdateProcessingTime";

const TimeCardContainer = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "4px",
});

const TimeContainer = styled(CardContent)({
  padding: "16px",
});

const ProcessingTime = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);
  const userType = useSelector((state) => state.user.user.type);

  useEffect(() => {
    getProcessingTime();
  }, []);

  const getProcessingTime = async () => {
    dispatch(loadingAction(true));
    try {
      const res = await request.get(`/processingtime`);

      if (res) {
        dispatch(loadingAction(false));
        setTime(res.data.data);
      }
    } catch (e) {
      setTime(0);
      // toastify("error", e.response.data.message);
      dispatch(loadingAction(false));
    }
  };

  const addProcessingTime = async (payload) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post("/processingtime", payload);

      if (res) {
        dispatch(loadingBtnAction(false));
        dispatch(setModalState(undefined));
        getProcessingTime();
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(loadingBtnAction(false));
    }
  };

  const updateProcessingTime = async (payload, id) => {
    dispatch(loadingBtnAction(true));
    try {
      const res = await request.post(`/processingtime/${id}`, payload);

      if (res) {
        dispatch(loadingBtnAction(false));
        dispatch(setModalState(undefined));
        getProcessingTime();
      }
    } catch (e) {
      toastify("error", e.response.data.message);
      dispatch(loadingBtnAction(false));
    }
  };

  return (
    <>
      <Stack direction={"row"} spacing={3} my={3}>
        <Typography variant="subtitle1">Processing time:</Typography>

        {userType === "Super Admin" && (
          <Add
            onClick={() => {
              dispatch(
                setModalState(
                  <SetProcessingTime
                    time={time}
                    addProcessingTime={addProcessingTime}
                  />
                )
              );
            }}
          />
        )}
      </Stack>
      <Grid container spacing={3}>
        {time?.map((item) => (
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <TimeCardContainer
              sx={{
                borderRight: `8px solid ${
                  item?.type === "ornament"
                    ? "#d98a3d"
                    : item?.type === "tumbler"
                    ? "#92e0a5"
                    : "#0AA4E6"
                }`,
              }}
            >
              <TimeContainer>
                <Typography variant="subtitle1" sx={{ maxWidth: "150px" }}>
                  {item?.processing_time}
                </Typography>
              </TimeContainer>
              {userType === "Super Admin" && (
                <Edit
                  onClick={() => {
                    dispatch(
                      setModalState(
                        <UpdateProcessingTime
                          item={item}
                          updateProcessingTime={updateProcessingTime}
                        />
                      )
                    );
                  }}
                />
              )}
              <Divider
                orientation="vertical"
                color="#919EAB"
                sx={{ height: "70px", width: "2px", mx: 1 }}
              />

              <img
                src={
                  item?.type === "ornament"
                    ? ornaments
                    : item?.type === "tumbler"
                    ? tumblers
                    : Jewelry
                }
                width={
                  item?.type === "ornament"
                    ? ""
                    : item?.type === "tumbler"
                    ? 45
                    : 50
                }
                height={
                  item?.type === "ornament"
                    ? ""
                    : item?.type === "tumbler"
                    ? 45
                    : 50
                }
              />
              <TimeContainer>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {item?.type}
                </Typography>
              </TimeContainer>
            </TimeCardContainer>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProcessingTime;
