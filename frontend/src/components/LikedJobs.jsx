import React from 'react';
import { useNavigate } from 'react-router-dom';

const LikedJobs = () => {
  const likedJobs = JSON.parse(localStorage.getItem('likedJobs')) || [];
  const navigate = useNavigate();

  return (
    <div className="liked-jobs-page">
      <br />
      <h2>Bookmarked Jobs</h2>
      {likedJobs.length === 0 ? (
        <p>No jobs bookmarked yet.</p>
      ) : (
        <div className="jobcard-grid">
          {likedJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-body">
                <img src={`http://localhost:5000${job.logoURL}`} alt="Company" className="job-card-logo" />
                <div>
                  <h4>{job.company}</h4>
                  <p>{job.country}</p>
                </div>
              </div>
              <h3>{job.title}</h3>
              <p>{job.description?.substring(0, 70)}...</p>
              <div className="job-card-footer">
                <span className="job-type">{job.workmode}</span>
                <span className="job-salary">{job.salary} LPA</span>
                <button className="details-btn" onClick={() => navigate(`/job/${job._id}`)}>Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LikedJobs;
