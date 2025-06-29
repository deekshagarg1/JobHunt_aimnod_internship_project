// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export const Description = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/jobs/${id}`)
//       .then(res => setJob(res.data))
//       .catch(err => console.error("Failed to load job", err));
//   }, [id]);

//   if (!job) return <div>Loading...</div>;

//   return (
//     <div className="job-detail">
//       <h2>{job.title}</h2>
//       <img src={`http://localhost:5000${job.logoURL}`} alt="Logo" style={{ width: '120px' }} />
//       <p><strong>Company:</strong> {job.company}</p>
//       <p><strong>Location:</strong> {job.country}</p>
//       <p><strong>Description:</strong> {job.description}</p>
//       <p><strong>Work Mode:</strong> {job.workmode}</p>
//       <p><strong>Salary:</strong> {job.salary} LPA</p>
//       <p><strong>Experience:</strong> {job.experience}</p>
//     </div>
//   );
// };

// export default Description;

import React from 'react'

export const Description = () => {
  return (
    <div>Description</div>
  )
}
