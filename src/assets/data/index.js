import { IoAnalyticsSharp } from "react-icons/io5";
import {
  FaFilm,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

// country images
import brazilImg from "../images/brazil.svg";
import usImg from "../images/us.svg";
import indiaImg from "../images/india.svg";
import englandImg from "../images/england.svg";
import turkeyImg from "../images/turkey.svg";
import canadaImg from "../images/canada.svg";

import editeShopImg from "../images/edite-shop_img.png";
import movieWebsiteImg from "../images/movie-website_img.png";

export const sidebarData = [
  {
    title: "analytics",
    path: "/analytics",
    icon: IoAnalyticsSharp,
  },
  {
    title: "movies",
    path: "/movies",
    icon: FaFilm,
  },
  {
    title: "users",
    path: "/users",
    icon: FiUsers,
  },
];

export const countries = [
  {
    image: brazilImg,
  },
  {
    image: usImg,
  },
  {
    image: indiaImg,
  },
  {
    image: englandImg,
  },
  {
    image: turkeyImg,
  },
  {
    image: canadaImg,
  },
];

export const socialLinks = [
  {
    id: 1,
    title: "GitHub",
    link: "https://github.com/phattran0505",
    icon: FaGithub,
  },
  {
    id: 2,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/phat-tran-10872831a/",
    icon: FaLinkedin,
  },
  {
    id: 3,
    title: "Facebook",
    link: "https://www.facebook.com/phat.tran.306106/",
    icon: FaFacebook,
  },
  {
    id: 4,
    title: "Portfolio",
    link: "https://portforlio-web-0505.netlify.app/",
    icon: FaGlobe,
  },
];

export const skillsData = [
  {
    id: 1,
    name: "HTML/CSS",
    level: 90,
  },
  {
    id: 2,
    name: "JavaScript",
    level: 85,
  },
  {
    id: 3,
    name: "React",
    level: 90,
  },
  {
    id: 4,
    name: "SCSS/SASS",
    level: 80,
  },
  {
    id: 5,
    name: "Node.js",
    level: 85,
  },
  {
    id: 6,
    name: "MongoDB",
    level: 70,
  },
  {
    id: 7,
    name: "C/C++",
    level: 80,
  },
  {
    id: 8,
    name: "Python",
    level: 60,
  },
];

export const projectsData = [
  {
    id: 1,
    title: "Edite shop",
    description:
      "A responsive and feature-rich online shopping platform that allows users to browse, filter, and search for products efficiently. Includes secure user authentication with Google login, shopping cart management, and a clean, intuitive user interface designed for a seamless shopping experience.",
    image: editeShopImg,
    year: "Aug 2024 - Nov 2024",
    isFeatured: true,
    githubLink: "https://github.com/phattran0505/Edite-Shop_fe",
    demoLink: "https://edite-shop.netlify.app",
    features: [
      "User authentication and authorization",
      "Product search and filtering",
      "Shopping cart management",
      "Wishlist or favorites management",
      "Customer reviews and rating",
      "AI-powered Chatbox Integration"
    ],
    technologies: ["React", "Node.js", "Redux", "MongoDB", "JWT"],
  },
  {
    id: 2,
    title: "Movie Website",
    description:
      "A responsive movie website with user login, movie search/filtering, and personal watchlist. Users can explore movies, save favorites, and manage their list. Admins can add/edit users data. Real-time data is fetched via public API.",
    image: movieWebsiteImg,
    year: "Jan 2025 - May 2025",
    isFeatured: false,
    githubLink: "https://github.com/phattran0505/movie-webstie_fe",
    demoLink: "https://movie-website-0505.netlify.app",
    features: [
      "User authentication and personal watchlists",
      "Movie search, filtering, and genre browsing",
      "Real-time movie data via public API integration",
      "Favorites and watch history tracking",
      "Admin dashboard for content management",
      "Responsive design for all devices",
    ],
    technologies: [
      "React",
      "Node.js",
      "Redux",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
      "kkphim API",
    ],
  },
];

export const filterCategories = [
  {
    name: "country",
    categories: [
      { name: "Tất cả", slug: "" },
      {
        name: "Việt Nam",
        slug: "viet-nam",
      },
      {
        name: "Trung Quốc",
        slug: "trung-quoc",
      },
      {
        name: "Thái Lan",
        slug: "thai-lan",
      },
      {
        name: "Hồng Kông",
        slug: "hong-kong",
      },
      {
        name: "Pháp",
        slug: "phap",
      },
      {
        name: "Đức",
        slug: "duc",
      },
      {
        name: "Hà Lan",
        slug: "ha-lan",
      },
      {
        name: "Mexico",
        slug: "mexico",
      },
      {
        name: "Thụy Điển",
        slug: "thuy-dien",
      },
      {
        name: "Philippines",
        slug: "philippines",
      },
      {
        name: "Đan Mạch",
        slug: "dan-mach",
      },
      {
        name: "Thụy Sĩ",
        slug: "thuy-si",
      },
      {
        name: "Ukraina",
        slug: "ukraina",
      },
      {
        name: "Hàn Quốc",
        slug: "han-quoc",
      },
      {
        name: "Âu Mỹ",
        slug: "au-my",
      },
      {
        name: "Ấn Độ",
        slug: "an-do",
      },
      {
        name: "Canada",
        slug: "canada",
      },
      {
        name: "Tây Ban Nha",
        slug: "tay-ban-nha",
      },
      {
        name: "Indonesia",
        slug: "indonesia",
      },
      {
        name: "Ba Lan",
        slug: "ba-lan",
      },
      {
        name: "Malaysia",
        slug: "malaysia",
      },
      {
        name: "Bồ Đào Nha",
        slug: "bo-dao-nha",
      },
      {
        name: "UAE",
        slug: "uae",
      },
      {
        name: "Châu Phi",
        slug: "chau-phi",
      },
      {
        name: "Ả Rập Xê Út",
        slug: "a-rap-xe-ut",
      },
      {
        name: "Nhật Bản",
        slug: "nhat-ban",
      },
      {
        name: "Đài Loan",
        slug: "dai-loan",
      },
      {
        name: "Anh",
        slug: "anh",
      },
      {
        name: "Quốc Gia Khác",
        slug: "quoc-gia-khac",
      },
      {
        name: "Thổ Nhĩ Kỳ",
        slug: "tho-nhi-ky",
      },
      {
        name: "Nga",
        slug: "nga",
      },
      {
        name: "Úc",
        slug: "uc",
      },
      {
        name: "Brazil",
        slug: "brazil",
      },
      {
        name: "Ý",
        slug: "y",
      },
      {
        name: "Na Uy",
        slug: "na-uy",
      },
    ],
  },
  {
    name: "genres",
    categories: [
      {
        name: "Hành Động",
        slug: "hanh-dong",
      },
      {
        name: "Miền Tây",
        slug: "mien-tay",
      },
      {
        name: "Trẻ Em",
        slug: "tre-em",
      },
      {
        name: "Lịch Sử",
        slug: "lich-su",
      },
      {
        name: "Cổ Trang",
        slug: "co-trang",
      },
      {
        name: "Chiến Tranh",
        slug: "chien-tranh",
      },
      {
        name: "Viễn Tưởng",
        slug: "vien-tuong",
      },
      {
        name: "Kinh Dị",
        slug: "kinh-di",
      },
      {
        name: "Tài Liệu",
        slug: "tai-lieu",
      },
      {
        name: "Bí Ẩn",
        slug: "bi-an",
      },
      {
        name: "Phim 18+",
        slug: "phim-18",
      },
      {
        name: "Tình Cảm",
        slug: "tinh-cam",
      },
      {
        name: "Tâm Lý",
        slug: "tam-ly",
      },
      {
        name: "Thể Thao",
        slug: "the-thao",
      },
      {
        name: "Phiêu Lưu",
        slug: "phieu-luu",
      },
      {
        name: "Âm Nhạc",
        slug: "am-nhac",
      },
      {
        name: "Gia Đình",
        slug: "gia-dinh",
      },
      {
        name: "Học Đường",
        slug: "hoc-duong",
      },
      {
        name: "Hài Hước",
        slug: "hai-huoc",
      },
      {
        name: "Hình Sự",
        slug: "hinh-su",
      },
      {
        name: "Võ Thuật",
        slug: "vo-thuat",
      },
      {
        name: "Khoa Học",
        slug: "khoa-hoc",
      },
      {
        name: "Thần Thoại",
        slug: "than-thoai",
      },
      {
        name: "Chính Kịch",
        slug: "chinh-kich",
      },
      {
        name: "Kinh Điển",
        slug: "kinh-dien",
      },
    ],
  },
  {
    name: "year",
    categories: [
      { name: "Tất cả", slug: "" },
      { name: "2025", slug: "2025" },
      { name: "2024", slug: "2024" },
      { name: "2023", slug: "2023" },
      { name: "2022", slug: "2022" },
      { name: "2021", slug: "2021" },
      { name: "2020", slug: "2020" },
      { name: "2019", slug: "2019" },
      { name: "2018", slug: "2018" },
      { name: "2017", slug: "2017" },
      { name: "2016", slug: "2016" },
      { name: "2015", slug: "2015" },
      { name: "2014", slug: "2014" },
      { name: "2013", slug: "2013" },
      { name: "2012", slug: "2012" },
      { name: "2011", slug: "2011" },
      { name: "2010", slug: "2010" },
      { name: "2009", slug: "2009" },
      { name: "2008", slug: "2008" },
      { name: "2007", slug: "2007" },
      { name: "2006", slug: "2006" },
      { name: "2005", slug: "2005" },
      { name: "2004", slug: "2004" },
      { name: "2003", slug: "2003" },
      { name: "2002", slug: "2002" },
      { name: "2001", slug: "2001" },
      { name: "2000", slug: "2000" },
      { name: "1999", slug: "1999" },
      { name: "1998", slug: "1998" },
      { name: "1997", slug: "1997" },
      { name: "1996", slug: "1996" },
      { name: "1995", slug: "1995" },
      { name: "1994", slug: "1994" },
      { name: "1993", slug: "1993" },
      { name: "1992", slug: "1992" },
      { name: "1991", slug: "1991" },
      { name: "1990", slug: "1990" },
      { name: "1989", slug: "1989" },
      { name: "1988", slug: "1988" },
      { name: "1987", slug: "1987" },
      { name: "1986", slug: "1986" },
      { name: "1985", slug: "1985" },
      { name: "1984", slug: "1984" },
      { name: "1983", slug: "1983" },
      { name: "1982", slug: "1982" },
      { name: "1981", slug: "1981" },
      { name: "1980", slug: "1980" },
      { name: "1979", slug: "1979" },
      { name: "1978", slug: "1978" },
      { name: "1977", slug: "1977" },
      { name: "1976", slug: "1976" },
      { name: "1975", slug: "1975" },
      { name: "1974", slug: "1974" },
      { name: "1973", slug: "1973" },
      { name: "1972", slug: "1972" },
      { name: "1971", slug: "1971" },
      { name: "1970", slug: "1970" },
    ],
  },
];
