import { toast } from "react-toastify";

export const toastify = (type, toastMessage) => {
  switch (type) {
    case "success":
      toast.success(toastMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        textTransform: "capitalize",
      });
      break;
    case "error":
      toast.error(toastMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        textTransform: "capitalize",
      });
      break;
    case "warning":
      toast.warn(toastMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        textTransform: "capitalize",
      });
      break;

    default:
      break;
  }
};
