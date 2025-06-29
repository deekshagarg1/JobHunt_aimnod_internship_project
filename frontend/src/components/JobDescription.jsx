// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const JobDescription = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     const fetchJob = async () => {
//       const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
//       setJob(res.data);
//     };
//     fetchJob();
//   }, [id]);

//   if (!job) return <div>Loading...</div>;

//   return (
//     <div className="job-description-page">
//       <h1>{job.title}</h1>
//       <p><strong>Company:</strong> {job.company}</p>
//       <p><strong>Location:</strong> {job.country}</p>
//       <p><strong>Description:</strong> {job.description}</p>
//       <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
//       <p><strong>Work Mode:</strong> {job.workmode}</p>
//       <p><strong>Salary:</strong> {job.salary} LPA</p>
//       <p><strong>Experience:</strong> {job.experience}</p>
//     </div>
//   );
// };

// export default JobDescription;







// JobDescription.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
        // Check localStorage for applied job
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        setIsApplied(appliedJobs.includes(id));
      } catch (err) {
        console.error('Error fetching job:', err);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = () => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (!appliedJobs.includes(id)) {
      appliedJobs.push(id);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      setIsApplied(true);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-description-container">
      <h1>{job.title}</h1>

      <div className="job-badges">
        <span className="badge green">{job.positions} Positions</span>
        <span className="badge blue">{job.workmode}</span>
        <span className="badge red">{job.salary} LPA</span>
      </div>

      <h3>Job Description</h3>
      <p><strong>Role:</strong> {job.title}</p>
      <p><strong>Location:</strong> {job.country}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Experience:</strong> {job.experience} year(s)</p>
      <p><strong>Salary:</strong> {job.salary} LPA</p>
      <p><strong>Total Applicants:</strong> {job.totalApplicants || 0}</p>
      <p><strong>Posted Date:</strong> {new Date(job.createdAt).toISOString().split('T')[0]}</p>

      {isApplied ? (
        <button className="applied-btn" disabled>Already Applied!</button>
      ) : (
        <button className="apply-btn" onClick={handleApply}>Apply Now</button>
      )}

      {isApplied && <p className="success-msg">Job Applied Successfully.</p>}
    </div>
  );
};

export default JobDescription;
