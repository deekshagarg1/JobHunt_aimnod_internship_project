import React from 'react'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
export const About = () => {
  return (
     <div className="about-container">
      <div className="about-card">
        <div className="about-left">
          <img
            src="/src/components/InShot_20250612_171344173.jpg"
            alt="Deeksha Garg"
            className="founder-img"
          />
          <h3 className="founder-name">Ms. Deeksha Garg</h3>
          <p className="founder-role">Founder of JobHunt Web</p>

          <div className="contact-icons">
            <a href="mailto:officialdeekshagarg@gmail.com" className="icon-link" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
            <a href="www.linkedin.com/in/deeksha-garg-abab80284" className="icon-link" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/deekshagarg1" className="icon-link" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="about-right">
          <h3>Founder</h3>
          <p>
            Ms. Deeksha Garg, the founder of <b>JobHunt Web</b>, is a dedicated MERN Stack Developer
            with expertise in building modern, responsive, and scalable web applications. She has
            developed multiple real-world projects including job portals, admin dashboards, e-commerce
            platforms, and more.
          </p>
          <p>
            Her skills span across the full stack—React.js and Tailwind CSS on the frontend, and
            Node.js, Express.js, and MongoDB on the backend. She’s passionate about writing clean code,
            designing intuitive UI/UX, and ensuring high performance in all applications.
          </p>
          <p>
            Deeksha believes in professionalism, honesty, and delivering real value. She is trusted
            by companies and individuals for her reliability and ability to turn ideas into
            fully functional products. With JobHunt Web, she aims to empower others by providing
            impactful digital solutions.
          </p>
          <a href="mailto:officialdeekshagarg@gmail.com" className="contact-btn">Contact Me</a>
        </div>
      </div>
    </div>
  )
}
