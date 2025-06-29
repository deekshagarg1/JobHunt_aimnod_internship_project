import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  if (!job || !job._id) return null;

  const [bookmarked, setBookmarked] = useState(false);
  

  useEffect(() => {
    const likedJobs = JSON.parse(localStorage.getItem('likedJobs')) || [];

    setBookmarked(likedJobs.some(j => j._id === job._id));  }, [job]);

  const toggleBookmark = () => {
    const likedJobs = JSON.parse(localStorage.getItem('likedJobs')) || [];
    let updated;
    if (bookmarked) {
      updated = likedJobs.filter(j => j._id !== job._id);
    } else {
      updated = [...likedJobs, job];
    }
    localStorage.setItem('likedJobs', JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };


  const handleDetails = () => {
    navigate(`/job/${job._id}`);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <span className="job-card-time">1 Day ago</span>
        <FaBookmark
          className="job-card-bookmark"
          onClick={toggleBookmark}
          style={{ color: bookmarked ? 'purple' : 'gray', cursor: 'pointer' }}
        />
      </div>

      <div className="job-card-body">
        <img
          src={`http://localhost:5000${job.logoURL}`}
          alt="Company"
          className="job-card-logo"
        />
        <div>
          <h4 className="job-card-company">{job.company}</h4>
          <p className="job-card-location">{job.country}</p>
        </div>
      </div>

      <h3 className="job-card-role">{job.title}</h3>
      <p className="job-card-description">
        {job.description?.substring(0, 60)}...
      </p>

      <div className="job-card-footer">
        <span className="job-type">{job.workmode}</span>
        <span className="job-salary">{job.salary} LPA</span>
        <button className="details-btn" onClick={handleDetails}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
