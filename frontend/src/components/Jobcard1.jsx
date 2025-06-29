// import React from 'react'
// import { useState } from 'react';
// import { FaBookmark } from 'react-icons/fa';

// export const Jobcard = () => {
//   const [bookmarked, setBookmarked] = useState(false);

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//   };


//   return (
// <>


//       <div className="job-card">
//         <div className="job-card-header">
//           <span className="job-card-time">1 Days ago</span>
//           <FaBookmark
//             className="job-card-bookmark"
//             onClick={toggleBookmark}
//             style={{ color: bookmarked ? 'purple' : 'gray', cursor: 'pointer' }}
//           />
//         </div>

//         <div className="job-card-body">
//           <img src="/company.png" alt="Company" className="job-card-logo" />
//           <div>
//             <h4 className="job-card-company">JobHunt</h4>
//             <p className="job-card-location">India</p>
//           </div>
//         </div>

//         <h3 className="job-card-role">Frontend Developer</h3>
//         <p className="job-card-description">
//           I need a Frontend Developer who can make professional UI web pages
//         </p>

//         <div className="job-card-footer">
//           <span className="job-type">Full Time</span>
//           <span className="job-salary">14 LPA</span>
//           <button className="details-btn">Details</button>
//         </div>
//       </div>
    

// </>
//   )
// }




// ---------working------------------

// import React, { useEffect, useState } from 'react';
// import { FaBookmark } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const Jobcard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [bookmarks, setBookmarks] = useState(() => {
//     return JSON.parse(localStorage.getItem('likedJobs')) || [];
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/jobs");
//         setJobs(res.data);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const toggleBookmark = (job) => {
//     let updatedBookmarks;
//     if (bookmarks.some(j => j._id === job._id)) {
//       updatedBookmarks = bookmarks.filter(j => j._id !== job._id);
//     } else {
//       updatedBookmarks = [...bookmarks, job];
//     }
//     setBookmarks(updatedBookmarks);
//     localStorage.setItem('likedJobs', JSON.stringify(updatedBookmarks));
//   };

//   const isBookmarked = (id) => bookmarks.some(job => job._id === id);

//   return (
//     <div className="jobcard-grid">
//       {jobs.map((job) => (
//         <div className="job-card" key={job._id}>
//           <div className="job-card-header">
//             <span className="job-card-time">1 Days ago</span>
//             <FaBookmark
//               className="job-card-bookmark"
//               onClick={() => toggleBookmark(job)}
//               style={{ color: isBookmarked(job._id) ? 'purple' : 'gray', cursor: 'pointer' }}
//             />
//           </div>

//           <div className="job-card-body">
//             <img src={`http://localhost:5000${job.logoURL}`} alt="Company" className="job-card-logo" />
//             <div>
//               <h4 className="job-card-company">{job.company}</h4>
//               <p className="job-card-location">{job.country}</p>
//             </div>
//           </div>

//           <h3 className="job-card-role">{job.title}</h3>
//           <p className="job-card-description">
//             {job.description?.substring(0, 70)}...
//           </p>

//           <div className="job-card-footer">
//             <span className="job-type">{job.workmode}</span>
//             <span className="job-salary">{job.salary} LPA</span>
//             <button className="details-btn" onClick={() => navigate(`/job/${job._id}`)}>
//               Details
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


















import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Jobcard = ({ job }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setBookmarked(saved.includes(job._id));

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setApplied(appliedJobs.includes(job._id));
  }, [job._id]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    let updated;
    if (saved.includes(job._id)) {
      updated = saved.filter(id => id !== job._id);
      setBookmarked(false);
    } else {
      updated = [...saved, job._id];
      setBookmarked(true);
    }
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updated));
  };

  const handleApply = () => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (!appliedJobs.includes(job._id)) {
      appliedJobs.push(job._id);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      setApplied(true);
    }
  };

  const viewDetails = () => {
    navigate(`/job/${job._id}`);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <span className="job-card-time">1 Days ago</span>
        <FaBookmark
          className="job-card-bookmark"
          onClick={toggleBookmark}
          style={{ color: bookmarked ? 'purple' : 'gray', cursor: 'pointer' }}
        />
      </div>

      <div className="job-card-body">
        <img src={`http://localhost:5000${job.logoURL}`} alt="Company" className="job-card-logo" />
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
        <button onClick={viewDetails}>Details</button>
        <button onClick={handleApply} disabled={applied}>
          {applied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default Jobcard;

