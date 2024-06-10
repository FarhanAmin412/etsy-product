import React from "react";
import { useSelector } from "react-redux";
import SellerChat from "./sections/seller";
import AdminChat from "./sections/admin";

const ChatPage = () => {
  const userType = useSelector((state) => state.user.user.type);

  return userType === "Seller" ? <SellerChat /> : <AdminChat />;
};

export default ChatPage;
