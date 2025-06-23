import { useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaGithub,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import classNames from "classnames/bind";

import { projectsData, socialLinks, skillsData } from "../../assets/data";

import styles from "./Profile.module.scss";
const cx = classNames.bind(styles);
function Profile() {
  useEffect(() => {
    const contentWrapper = document.querySelector(".content-wrapper");
    if (contentWrapper) {
      contentWrapper.scrollTop = 0;
    }
  }, []);
  return (
    <div className={cx("profile")}>
      <div className={cx("profile-container")}>
        <div className={cx("profile-header")}>
          <div className={cx("profile-avatar")}>
            <img src={"https://res.cloudinary.com/djmeybzjk/image/upload/v1750653887/avatar_hpvpyl.jpg"} alt="Profile Avatar" />
          </div>
          <h1 className={cx("profile-name")}>Tran Xuan Phat</h1>
          <p className={cx("profile-title")}>
            Frontend Developer | Fullstack Developer
          </p>
          <div className={cx("social-links")}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className={cx("profile-info")}>
          <div className={cx("info-item")}>
            <FaUser className={cx("icon")} />
            <div className={cx("info-content")}>
              <label>Username</label>
              <p>Tran Xuan Phat</p>
            </div>
          </div>

          <div className={cx("info-item")}>
            <FaEnvelope className={cx("icon")} />
            <div className={cx("info-content")}>
              <label>Email</label>
              <p>phattran052004@gmail.com</p>
            </div>
          </div>

          <div className={cx("info-item")}>
            <FaPhone className={cx("icon")} />
            <div className={cx("info-content")}>
              <label>Phone</label>
              <p>0397192664</p>
            </div>
          </div>

          <div className={cx("info-item")}>
            <FaMapMarkerAlt className={cx("icon")} />
            <div className={cx("info-content")}>
              <label>Location</label>
              <p>Ho Chi Minh city, Vietnam</p>
            </div>
          </div>
        </div>

        <div className={cx("about-section")}>
          <h2>About Me</h2>
          <p>
            I am a passionate Front-End Developer with solid expertise in
            ReactJS and NodeJS, eager to contribute to real-world projects. My
            strong technical foundation, combined with a background in IoT,
            enables me to integrate web development with modern technologies and
            deliver innovative, user-centered solutions. I am committed to
            developing efficient, user-focused applications while continuously
            improving my teamwork, communication, and problem-solving skills in
            a professional environment.
          </p>
        </div>

        <div className={cx("skills-section")}>
          <h2>Skills</h2>
          <div className={cx("skills-grid")}>
            {skillsData.map((skill) => (
              <div className={cx("skill-item")} key={skill.id}>
                <span className={cx("skill-name")}>{skill.name}</span>
                <div
                  className={cx("skill-level")}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cx("education-section")}
          style={{ marginBottom: "30px" }}
        >
          <h2>
            <FaGraduationCap className={cx("section-icon")} />
            Education
          </h2>
          <div className={cx("timeline")}>
            <div className={cx("timeline-item")}>
              <div className={cx("timeline-date")}>2022 - 2027</div>
              <div className={cx("timeline-content")}>
                <h3>Bachelor of Internet of Things</h3>
                <h4>
                  Posts and Telecommunications Institute of Technology in HCM
                </h4>
                <p>Major: Internet of Things</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className={cx("certification-section")}
          style={{ marginBottom: "30px" }}
        >
          <h2>
            <FaCertificate className={cx("section-icon")} />
            Certifications
          </h2>
          <div className={cx("timeline")}>
            <div className={cx("timeline-item")}>
              <div className={cx("timeline-date")}>2023</div>
              <div className={cx("timeline-content")}>
                <h3>React Developer Certificate</h3>
                <h4>Udemy</h4>
              </div>
            </div>
            <div className={cx("timeline-item")}>
              <div className={cx("timeline-date")}>2023</div>
              <div className={cx("timeline-content")}>
                <h3>Web Development Bootcamp</h3>
                <h4>F8 Education</h4>
              </div>
            </div>
          </div>
        </div> */}

        <div className={cx("projects-section")}>
          <h2>
            <FaLaptopCode className={cx("section-icon")} />
            Personal Projects
          </h2>
          <div className={cx("projects-grid")}>
            {projectsData.map((project) => (
              <div className={cx("project-card")} key={project.id}>
                <div className={cx("project-header")}>
                  <h3>{project.title}</h3>
                  <div className={cx("project-links")}>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                <div className={cx("project-meta")}>
                  <span>
                    <FaCalendarAlt /> {project.year}
                  </span>
                </div>
                <div className={cx("project-image")}>
                  <img src={project.image} alt={project.title} />
                </div>
                <p>{project.description}</p>
                <div className={cx("project-features")}>
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={cx("project-tags")}>
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
