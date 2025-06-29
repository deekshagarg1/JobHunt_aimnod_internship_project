import React, { useRef } from 'react';
// import './RoleSlider.css';

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Data Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Product Manager",
  "Fullstack Developer"
];

const RoleSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (direction === 'left') {
      current.scrollLeft -= 150;
    } else {
      current.scrollLeft += 150;
    }
  };

  return (
    <div className="role-slider-wrapper">
      <button className="arrow" onClick={() => scroll('left')}>&larr;</button>

      <div className="role-slider" ref={sliderRef}>
        {roles.map((role, index) => (
          <div key={index} className="role-tag">{role}</div>
        ))}
      </div>

      <button className="arrow" onClick={() => scroll('right')}>&rarr;</button>
    </div>
  );
};

export default RoleSlider;
