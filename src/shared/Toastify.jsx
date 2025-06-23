import { toast } from "react-toastify";

const defaultToastConfig = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "8px",
    padding: "12px 24px",
  },
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    ...defaultToastConfig,
    icon: "🎉",
  });
};

export const toastWarn = (message) => {
  return toast.warn(message, {
    ...defaultToastConfig,
    icon: "⚠️",
  });
};

export const toastError = (message) => {
  return toast.error(message, {
    ...defaultToastConfig,
    icon: "❌",
  });
};

export const toastInfo = (message) => {
  return toast.info(message, {
    ...defaultToastConfig,
    icon: "ℹ️",
  });
};
