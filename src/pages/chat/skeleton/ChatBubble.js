import { Skeleton } from "@mui/material";
import React from "react";

const ChatBubble = ({ position, width }) => {
  const isLeft = position === "left";
  return (
    <div className={`chat-bubble ${isLeft ? "left" : "right"}`}>
      {isLeft && (
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
      )}
      <Skeleton
        variant="text"
        width={width}
        animation="wave"
        className={`bubble-content ${isLeft ? "left" : "right"}`}
      />
      {!isLeft && (
        <Skeleton variant="circular" width={40} height={40} sx={{ ml: 2 }} />
      )}
    </div>
  );
};

export default ChatBubble;
