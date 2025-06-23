import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { FaUserCheck } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import axios from "axios";

import { BASE_URL } from "../../config/utils";

import styles from "./Analytics.module.scss";
const cx = classNames.bind(styles);
// Sample data for last 4 months
const viewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 4500 },
  { name: "Apr", views: 5000 },
];
const newUsersData = [
  { name: "Jan", users: 10 },
  { name: "Feb", users: 40 },
  { name: "Mar", users: 30 },
  { name: "Apr", users: 20 },
];
const moviesData = [
  { name: "Jan", movies: 2 },
  { name: "Feb", movies: 4 },
  { name: "Mar", movies: 9 },
  { name: "Apr", movies: 5 },
  { name: "May", movies: 8 },
  { name: "Jun", movies: 8 },
  { name: "Jul", movies: 15 },
  { name: "Aug", movies: 12 },
  { name: "Sep", movies: 13 },
  { name: "Oct", movies: 8 },
  { name: "Nov", movies: 10 },
  { name: "Dec", movies: 18 },
];

// Tính toán số liệu lớn và phần trăm tăng trưởng
const current = viewsData[viewsData.length - 1].views;
const prev = viewsData[viewsData.length - 2].views;
const percent = prev ? (((current - prev) / prev) * 100).toFixed(1) : 0;
const percentText =
  percent > 0
    ? `${percent}% higher than last month.`
    : `${Math.abs(percent)}% lower than last month.`;

// Tính toán số liệu lớn và phần trăm tăng trưởng cho new-users
const currentUsers = newUsersData[newUsersData.length - 1].users;
const prevUsers = newUsersData[newUsersData.length - 2].users;
const percentUsers = prevUsers
  ? (((currentUsers - prevUsers) / prevUsers) * 100).toFixed(1)
  : 0;
const percentUsersText =
  percentUsers > 0
    ? `${percentUsers}% higher than last month.`
    : `${Math.abs(percentUsers)}% lower than last month.`;

function Analytics() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [maleUsers, setMaleUsers] = useState([]);
  const [femaleUsers, setFemaleUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  const fetchActiveUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analytics/active-users`);
      const result = response.data;
      setActiveUsers(result.data);
    } catch (error) {
      console.error("Error fetching active users:", error);
    }
  };
  const fetchMaleUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analytics/male-users`);
      const result = response.data;
      setMaleUsers(result.data);
    } catch (error) {
      console.error("Error fetching male users:", error);
    }
  };
  const fetchFemaleUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analytics/female-users`);
      const result = response.data;
      setFemaleUsers(result.data);
    } catch (error) {
      console.error("Error fetching female users:", error);
    }
  };
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analytics/total-users`);
      const result = response.data;
      setTotalUsers(result.data);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };
  useEffect(() => {
    fetchActiveUsers();
    fetchMaleUsers();
    fetchFemaleUsers();
    fetchTotalUsers();
  }, []);
  return (
    <div className={cx("analytics-page")}>
      <div className={cx("overview-container")}>
        <div className={cx("overview-item")}>
          <div className={cx("overview-content")}>
            <div
              className={cx("overview-icon")}
              style={{ backgroundColor: "#f87957" }}
            >
              <i>
                <FiUsers />
              </i>
            </div>
            <div className={cx("overview-des")}>  
              <h3 style={{ color: "#f87957" }}>
                <CountUp end={totalUsers} duration={2} />
              </h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>
        <div className={cx("overview-item")}>
          <div className={cx("overview-content")}>
            <div
              className={cx("overview-icon")}
              style={{ backgroundColor: "#ffae1f" }}
            >
              <i>
                <FaUserCheck />
              </i>
            </div>
            <div className={cx("overview-des")}>
              <h3 style={{ color: "#ffae1f" }}>
                <CountUp end={activeUsers} duration={2} />
              </h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
        <div className={cx("overview-item")}>
          <div className={cx("overview-content")}>
            <div
              className={cx("overview-icon")}
              style={{ backgroundColor: "#3688fa" }}
            >
              <i>
                <PiGenderMaleBold />
              </i>
            </div>
            <div className={cx("overview-des")}>
              <h3 style={{ color: "#3688fa" }}>
                <CountUp end={maleUsers} duration={2} />
              </h3>
              <p>Male Users</p>
            </div>
          </div>
        </div>
        <div className={cx("overview-item")}>
          <div className={cx("overview-content")}>
            <div
              className={cx("overview-icon")}
              style={{ backgroundColor: "#26ba4f" }}
            >
              <i>
                <PiGenderFemaleBold />
              </i>
            </div>
            <div className={cx("overview-des")}>
              <h3 style={{ color: "#26ba4f" }}>
                <CountUp end={femaleUsers} duration={2} />
              </h3>
              <p>Female Users</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("chart-container")}>
        <div className={cx("total-views_chart")}>
          <div className={cx("card")}>
            <div className={cx("card-header")}>
              <h3>Total Views</h3>
            </div>
            <ResponsiveContainer
              width="100%"
              height={300}
              style={{ margin: "0 auto" }}
            >
              <BarChart data={viewsData} barSize={100}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    color: "#fff",
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{
                    color: "#fff",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "rgba(136,132,216,0.08)" }}
                />
                <Bar dataKey="views" radius={[16, 16, 0, 0]} fill="#6486e3">
                  {viewsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="#6486e3" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: window.innerWidth <= 768 ? "1.5rem" : "2.5rem",
                  marginBottom: window.innerWidth <= 768 ? ".3rem" : ".5rem",
                  color: "inherit",
                  lineHeight: "1.2",
                  fontWeight: window.innerWidth <= 768 ? "600" : "700"
                }}
              >
                {current}
              </h2>
              <h6
                style={{
                  color: percent > 0 ? "#6c757d" : "#e74c3c",
                  fontSize: ".85rem",
                  marginBottom: ".2rem",
                  opacity: 0.7,
                  lineHeight: "100%",
                  fontWeight: 400,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {percentText}
              </h6>
            </div>
          </div>
        </div>
        <div className={cx("total-movies_chart")}>
          <div className={cx("card")}>
            <div className={cx("card-header")}>
              <h3>Total Movies</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={moviesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorMovies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4db3ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4db3ff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    color: "#fff",
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="movies"
                  stroke="#4db3ff"
                  strokeWidth={5}
                  fill="url(#colorMovies)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={cx("new-user_chart")}>
          <div className={cx("card")}>
            <div className={cx("card-header")}>
              <h3>New Users</h3>
            </div>
            <ResponsiveContainer
              width="100%"
              height={300}
              style={{ margin: "0 auto" }}
            >
              <BarChart data={newUsersData} barSize={100}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    color: "#fff",
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{
                    color: "#fff",
                    fontWeight: 500,
                  }}
                  cursor={{ fill: "rgba(136,132,216,0.08)" }}
                />
                <Bar dataKey="users" radius={[16, 16, 0, 0]} fill="#6486e3">
                  {newUsersData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="#6486e3" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: window.innerWidth <= 768 ? "1.5rem" : "2.5rem",
                  marginBottom: window.innerWidth <= 768 ? ".3rem" : ".5rem",
                  color: "inherit",
                  lineHeight: "1.2",
                  fontWeight: window.innerWidth <= 768 ? "600" : "700"
                }}
              >
                {currentUsers}
              </h2>
              <h6
                style={{
                  color: percentUsers > 0 ? "#6c757d" : "#e74c3c",
                  fontSize: ".85rem",
                  marginBottom: ".2rem",
                  opacity: 0.7,
                  lineHeight: "100%",
                  fontWeight: 400,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {percentUsersText}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
