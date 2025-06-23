import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/utils";
import { toastError } from "../shared/Toastify";

export const useHealthCheck = (handleLogout) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/health-check`, {
          timeout: 2000,
        });
        if (!res.data || !res.data.status || res.data.status !== "ok") {
          handleServerDown();
        }
      } catch (error) {
        handleServerDown();
      }
    };

    const handleServerDown = () => {
      // Hiển thị thông báo
      toastError("Mất kết nối đến server. Vui lòng đăng nhập lại.");

      // Gọi hàm logout từ context nếu được truyền vào
      if (handleLogout) {
        handleLogout();
      }

      // Chuyển về trang login
      navigate("/login");
    };

    // Check ngay khi component mount
    checkServerHealth();

    // Set up interval để check định kỳ (mỗi 30 giây)
    const intervalId = setInterval(checkServerHealth, 30000);

    // Cleanup khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate, handleLogout]);
};
