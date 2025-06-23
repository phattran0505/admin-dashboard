import { useDispatch, useSelector } from "react-redux";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SOCKET_URL, BASE_URL } from "../config/utils";
import { loginSuccess } from "../redux/authSlice";
import useAxiosJWT from "../config/axiosConfig";
import { toastError } from "../shared/Toastify";

export const NotificationContext = createContext();

function NotificationContextProvider({ children }) {
  const dispatch = useDispatch();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const user = useSelector((state) => state?.auth?.user);
  const [notifications, setNotifications] = useState(
    user?.adminInfo?.notificationList || []
  );
  const [unreadNotifications, setUnreadNotifications] = useState(
    user?.adminInfo?.notificationList?.filter(
      (notification) => !notification.read
    ).length
  );
  const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });

  const handleNotification = (notification) => {
    if (user?.adminInfo) {
      const updatedNotifications = [
        ...(user.adminInfo.notificationList || []),
        notification,
      ];
      dispatch(
        loginSuccess({
          ...user,
          adminInfo: {
            ...user.adminInfo,
            notificationList: updatedNotifications,
          },
        })
      );
      setNotifications(updatedNotifications);
      setUnreadNotifications(
        updatedNotifications.filter((notification) => !notification.read).length
      );
    }
  };

  useEffect(() => {
    socket.on("userAdded", handleNotification);
    socket.on("userUpdated", handleNotification);
    socket.on("userDeleted", handleNotification);

    return () => {
      socket.off("userAdded");
      socket.off("userUpdated");
      socket.off("userDeleted");
      socket.disconnect();
    };
  }, [user, dispatch]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/notification/read-one/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedNotifications = notifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        );
        dispatch(
          loginSuccess({
            ...user,
            adminInfo: {
              ...user.adminInfo,
              notificationList: updatedNotifications,
            },
          })
        );
        setNotifications(updatedNotifications);
        setUnreadNotifications(
          updatedNotifications.filter((notification) => !notification.read)
            .length
        );
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/notification/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          read: true,
        }));
        dispatch(
          loginSuccess({
            ...user,
            adminInfo: {
              ...user.adminInfo,
              notificationList: updatedNotifications,
            },
          })
        );
        setNotifications(updatedNotifications);
        setUnreadNotifications(
          updatedNotifications.filter((notification) => !notification.read)
            .length
        );
      }
    } catch (error) {
      return toastError(error?.response?.data?.message);
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
