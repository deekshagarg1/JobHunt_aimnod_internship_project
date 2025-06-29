// import React, { useState } from 'react';
// import JobCard from './Jobcard';
// // import Jobcard from './Jobcard1';
// // import { Jobcard } from './Jobcard';
// // import './Job.css';

// export const Job = () => {


//   return (
//    <>
//     <div className="job-card-container">
//          <h3>Search Results (1)</h3>
//  <div className="jobAll">

//     <JobCard />
//  </div>
//    </div>
//    </>
//   );
// };

// export default Job;




import React, { useEffect, useState } from 'react';
import JobCard from './Jobcard';
import axios from 'axios';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-card-container">
      <h3>Search Results ({jobs.length})</h3>
      <br />
      <br />
      <div className="jobAll" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'  , alignItems: "center" , justifyContent:"center"}}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Job;

