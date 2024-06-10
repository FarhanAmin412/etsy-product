import { OutlinedInput, alpha, styled } from "@mui/material";
import { format, isToday } from "date-fns";

export const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: "85%",
  borderRadius: "24px",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: "86%",
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export const getLastMessage = (lastIndex) => {
  let last_msgArray = lastIndex?.msg_received
    ? lastIndex?.msg_received?.split(",").filter((item) => item !== "")
    : lastIndex?.msg_sent?.split(",").filter((item) => item !== "");

  let last_msg = last_msgArray[last_msgArray?.length - 1];
  if (last_msg.includes("|")) {
    const parts = last_msg.split("|");
    const lastPart = parts[parts.length - 1];

    return lastPart;
  } else {
    return last_msg;
  }
};

export function formatDate(updated_at) {
  let date = new Date(updated_at);
  if (isToday(date)) {
    return format(date, "hh:mm a");
  } else {
    return format(date, "dd/MM/yyyy");
  }
}
