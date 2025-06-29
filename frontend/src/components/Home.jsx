import React, { useEffect, useState } from 'react';
import { FaBookmark, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import RoleSlider from './RoleSlider';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [bookmarked, setBookmarked] = useState({}); // for bookmark toggle

  const fetchJobs = async (query = '') => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      const allJobs = res.data;

      // Safe filter
      const filteredJobs = allJobs.filter((job) => {
        const title = job.title?.toLowerCase() || '';
        const company = job.company?.toLowerCase() || '';
        return title.includes(query.toLowerCase()) || company.includes(query.toLowerCase());
      });

      setJobs(filteredJobs.slice(0, 6));
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs(keyword);
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const goToDetails = (id) => {
    alert(`Go to detail page for Job ID: ${id}`);
    // You can use navigate(`/job/${id}`) if using react-router
  };

  return (
    <div className="home">
      <div className="badge1">No.1 Job Hunt Website</div>
      <h1>Search, Apply &</h1>
      <h1>Get your <span className="highlight">Dream Jobs</span></h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search jobs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>

      <RoleSlider />

      <h1 style={{ marginTop: "3rem" }}>Latest Jobs</h1>

      <div className="job-card-container">
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <div className="job-header">
              <span className="job-time">1 Day ago</span>
              <FaBookmark
                className={`bookmark-icon ${bookmarked[job._id] ? 'active' : ''}`}
                onClick={() => toggleBookmark(job._id)}
              />
            </div>

            <div className="job-company">
              <img
                src={`http://localhost:5000${job.logoURL}`}
                alt="logo"
                className="company-logo"
              />
              <div>
                <div className="job-title">{job.company}</div>
                <div className="job-location">{job.country}</div>
              </div>
            </div>

            <div className="job-role">
              <strong>{job.title}</strong>
            </div>

            <p className="job-description">
              {job.description?.substring(0, 60)}...
            </p>

            <div className="job-tags">
              <span className="tag tag-blue">{job.workmode}</span>
              <span className="tag tag-red">{job.salary} LPA</span>
              <button className="details-btn" onClick={() => goToDetails(job._id)}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

