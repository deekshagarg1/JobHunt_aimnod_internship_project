// import React, { useState } from "react";
// import axios from 'axios';
// // import './Admin.css';

// export const Admin = () => {
//   const [formData, setFormData] = useState({
//     company: "",
//     country: "",
//     title: "",
//     description: "",
//     skills: "",
//     workmode: "",
//     salary: "",
//     experience: ""
//   });

//   const [logo, setLogo] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setLogo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }
//     if (logo) {
//       data.append("logo", logo);
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/jobs", data);
//       alert("Job posted successfully!");
//       console.log(res.data);
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Error submitting job");
//     }
//   };

//   return (
//     <div className="admin-form-container">
//       <h2>📝 Post a New Job</h2>
//       <form onSubmit={handleSubmit} className="admin-job-form" encType="multipart/form-data">
//         <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
//         <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
//         <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
//         <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
//         <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
//         <select name="workmode" value={formData.workmode} onChange={handleChange}>
//           <option value="">Select Work Mode</option>
//           <option value="Remote">Remote</option>
//           <option value="Onsite">Onsite</option>
//           <option value="Hybrid">Hybrid</option>
//         </select>
//         <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
//         <input type="text" name="experience" placeholder="Experience (e.g., 2 years)" value={formData.experience} onChange={handleChange} />
//         <label className="file-label">
//           Upload Logo:
//           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//         </label>
//         <button type="submit">Submit Job</button>
//       </form>
//     </div>
//   );
// };


















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// // import job from "../../../backend/job";
// // import "./Admin.css";

// export const Admin = () => {
//   const [formData, setFormData] = useState({
//     company: "",
//     country: "",
//     title: "",
//     description: "",
//     skills: "",
//     workmode: "",
//     salary: "",
//     experience: "",
//   });
//   const [logo, setLogo] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs", err);
//       setMessage("Failed to fetch jobs. Please try again later.");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     setLogo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       if (key !== "skills") {
//         data.append(key, formData[key]);
//       }
//     }
//     formData.skills.split(",").forEach((skill) => {
//       data.append("skills", skill.trim());
//     });
//     if (logo) data.append("logo", logo);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/jobs/${editId}`, {
//           ...formData,
//           skills: formData.skills.split(",").map((s) => s.trim()),
//         });
//         setEditId(null);
//         setMessage("Job updated successfully.");
//       } else {
//         await axios.post("http://localhost:5000/api/jobs", data);
//         setMessage("Job submitted successfully.");
//       }

//       setFormData({
//         company: "",
//         country: "",
//         title: "",
//         description: "",
//         skills: "",
//         workmode: "",
//         salary: "",
//         experience: "",
//       });
//       setLogo(null);
//       fetchJobs();
//     } catch (err) {
//       console.error("Error submitting job", err);
//       setMessage("Error submitting job. Please check your input.");
//     }
//   };

//   const handleEdit = (job) => {
//     setEditId(job._id);
//     setFormData({
//       ...job,
//       skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
//     });
//     setMessage("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/jobs/${id}`);
//       fetchJobs();
//       setMessage("Job deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting job", err);
//       setMessage("Error deleting job. Please try again.");
//     }
//   };

//   const filteredJobs = jobs.filter((job) => {
//     return job?.title?.toLowerCase().includes(search.toLowerCase());
//   });

//   return (
//     <div className="admin-page">
//       <h2 className="admin-heading">📝 Post a New Job</h2>
//       {message && <div className="message-box">{message}</div>}

//       <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
//         <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
//         <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
//         <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
//         <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
//         <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
//         <select name="workmode" value={formData.workmode} onChange={handleChange}>
//           <option value="">Select Work Mode</option>
//           <option value="Remote">Remote</option>
//           <option value="Onsite">Onsite</option>
//           <option value="Hybrid">Hybrid</option>
//         </select>
//         <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
//         <input type="text" name="experience" placeholder="Experience (e.g., 2 years)" value={formData.experience} onChange={handleChange} />
//         <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//         <button className="submit-btn" type="submit">{editId ? "Update Job" : "Submit Job"}</button>
//       </form>

//       <div className="job-list">
//         <div className="search-bar">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search jobs by title..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search-input"
//           />
//         </div>

// {/* {jobs.map((item)=><>{item.company}</>)} */}

// <div>


  
//         {jobs.map((job) => (
//           <div className="job-card" key={job._id}>
//             {job.logoURL && <img src={`http://localhost:5000${job.logoURL}`} alt="logo" className="job-logo" />}
//             <h3>{job.title}</h3>
//             <p><strong>Company:</strong> {job.company}</p>
//             <p><strong>Country:</strong> {job.country}</p>
//             <p><strong>Work Mode:</strong> {job.workmode}</p>
//             <p><strong>Salary:</strong> ₹{job.salary}</p>
//             <p><strong>Experience:</strong> {job.experience}</p>
//             <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
//             <p>{job.description}</p>
//             <div className="action-buttons">
//               <button className="edit-btn" onClick={() => handleEdit(job)}><FaEdit /> Edit</button>
//               <button className="delete-btn" onClick={() => handleDelete(job._id)}><FaTrash /> Delete</button>
//             </div>
//           </div>
//         ))}
// </div>


// {filteredJobs.map((job) => (
//           <div className="job-card" key={job._id}>
//             {job.logoURL && <img src={`http://localhost:5000${job.logoURL}`} alt="logo" className="job-logo" />}
//             <div className="job-card-body">
//               <h3 className="job-title">{job.title}</h3>
//               <p><strong>Company:</strong> {job.company}</p>
//               <p><strong>Country:</strong> {job.country}</p>
//               <p><strong>Work Mode:</strong> {job.workmode}</p>
//               <p><strong>Salary:</strong> ₹{job.salary}</p>
//               <p><strong>Experience:</strong> {job.experience}</p>
//               <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
//               <p>{job.description}</p>
//               <div className="action-buttons">
//                 <button className="edit-btn" onClick={() => handleEdit(job)}><FaEdit /> Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(job._id)}><FaTrash /> Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

















// -------------working------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// // import "./Admin.css";

// export const Admin = () => {
//   const [formData, setFormData] = useState({
//     company: "",
//     country: "",
//     title: "",
//     description: "",
//     skills: "",
//     workmode: "",
//     salary: "",
//     experience: "",
//   });
//   const [logo, setLogo] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [showEditForm, setShowEditForm] = useState(false);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs", err);
//       setMessage("Failed to fetch jobs. Please try again later.");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     setLogo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       if (key !== "skills") {
//         data.append(key, formData[key]);
//       }
//     }
//     formData.skills.split(",").forEach((skill) => {
//       data.append("skills", skill.trim());
//     });
//     if (logo) data.append("logo", logo);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/jobs/${editId}`, {
//           ...formData,
//           skills: formData.skills.split(",").map((s) => s.trim()),
//         });
//         setEditId(null);
//         setShowEditForm(false);
//         setMessage("Job updated successfully.");
//       } else {
//         await axios.post("http://localhost:5000/api/jobs", data);
//         setMessage("Job submitted successfully.");
//       }

//       setFormData({
//         company: "",
//         country: "",
//         title: "",
//         description: "",
//         skills: "",
//         workmode: "",
//         salary: "",
//         experience: "",
//       });
//       setLogo(null);
//       fetchJobs();
//     } catch (err) {
//       console.error("Error submitting job", err);
//       setMessage("Error submitting job. Please check your input.");
//     }
//   };

//   const handleEdit = (job) => {
//     setEditId(job._id);
//     setShowEditForm(true);
//     setFormData({
//       ...job,
//       skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
//     });
//     setMessage("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/jobs/${id}`);
//       fetchJobs();
//       setMessage("Job deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting job", err);
//       setMessage("Error deleting job. Please try again.");
//     }
//   };

//   const filteredJobs = jobs.filter((job) => job?.title?.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="admin-page">
//       <h2 className="admin-heading">📝 Post a New Job</h2>
//       {message && <div className="message-box">{message}</div>}

//       <div className="search-bar">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search jobs by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       <form onSubmit={handleSubmit} className={`admin-form ${showEditForm ? "popup-form" : ""}`} encType="multipart/form-data" style={{ display: showEditForm || !editId ? 'block' : 'none' }}>
//         <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
//         <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
//         <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
//         <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
//         <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
//         <select name="workmode" value={formData.workmode} onChange={handleChange}>
//           <option value="">Select Work Mode</option>
//           <option value="Remote">Remote</option>
//           <option value="Onsite">Onsite</option>
//           <option value="Hybrid">Hybrid</option>
//         </select>
//         <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
//         <input type="text" name="experience" placeholder="Experience (e.g., 2 years)" value={formData.experience} onChange={handleChange} />
//         <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//         <button className="submit-btn" type="submit">{editId ? "Update Job" : "Submit Job"}</button>
//       </form>



// <div>
//          {jobs.map((job) => (
//           <div className="job-card" key={job._id}>
//             {job.logoURL && <img src={`http://localhost:5000${job.logoURL}`} alt="logo" className="job-logo" />}
//             <h3>{job.title}</h3>
//             <p><strong>Company:</strong> {job.company}</p>
//             <p><strong>Country:</strong> {job.country}</p>
//             <p><strong>Work Mode:</strong> {job.workmode}</p>
//             <p><strong>Salary:</strong> ₹{job.salary}</p>
//             <p><strong>Experience:</strong> {job.experience}</p>
//             <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
//             <p>{job.description}</p>
//             <div className="action-buttons">
//               <button className="edit-btn" onClick={() => {handleEdit(job) , setShowEditForm(!showEditForm)}}><FaEdit /> Edit</button>
//               <button className="delete-btn" onClick={() => handleDelete(job._id)}><FaTrash /> Delete</button>
//             </div>
//           </div>
//         ))}
// </div>




//       <div className="job-list">
//       {showEditForm && editId && (
//   <div className="edit-popup-card">
//     {(() => {
//       const job = jobs.find(j => j._id === editId);
//       return job ? (
//         <div className="job-card">
//           {job.logoURL && <img src={`http://localhost:5000${job.logoURL}`} alt="logo" className="job-logo" />}
//           <div className="job-card-body">
//             <h3 className="job-title">{job.title}</h3>
//             <p><strong>Company:</strong> {job.company}</p>
//             <p><strong>Country:</strong> {job.country}</p>
//             <p><strong>Work Mode:</strong> {job.workmode}</p>
//             <p><strong>Salary:</strong> ₹{job.salary}</p>
//             <p><strong>Experience:</strong> {job.experience}</p>
//             <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
//             <p>{job.description}</p>
//           </div>
//         </div>
//       ) : null;
//     })()}
//   </div>
// )}

//       </div>
//     </div>
//   );
// };


















import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import "./Admin.css";

export const Admin = () => {
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    title: "",
    description: "",
    skills: "",
    workmode: "",
    salary: "",
    experience: "",
  });
  const [logo, setLogo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
      setMessage("Failed to fetch jobs. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key !== "skills") {
        data.append(key, formData[key]);
      }
    }
    formData.skills.split(",").forEach((skill) => {
      data.append("skills", skill.trim());
    });
    if (logo) data.append("logo", logo);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/jobs/${editId}`, {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        });
        setEditId(null);
        setShowEditForm(false);
        setMessage("Job updated successfully.");
      } else {
        await axios.post("http://localhost:5000/api/jobs", data);
        setMessage("Job submitted successfully.");
      }

      setFormData({
        company: "",
        country: "",
        title: "",
        description: "",
        skills: "",
        workmode: "",
        salary: "",
        experience: "",
      });
      setLogo(null);
      fetchJobs();
    } catch (err) {
      console.error("Error submitting job", err);
      setMessage("Error submitting job. Please check your input.");
    }
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setShowEditForm(true);
    setFormData({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
    });
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      fetchJobs();
      setMessage("Job deleted successfully.");
    } catch (err) {
      console.error("Error deleting job", err);
      setMessage("Error deleting job. Please try again.");
    }
  };

  const filteredJobs = jobs.filter((job) => job?.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-page">
      <h2 className="admin-heading">📝 Post a New Job</h2>
      {message && <div className="message-box">{message}</div>}

     <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="search-btn" onClick={() => setSearch(search.trim())}><FaSearch /></button>
      </div>

      {showEditForm && (
       <div className="popup-form">
          <button className="close-btn" onClick={() => setShowEditForm(false)}>X</button>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
            <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
            <select name="workmode" value={formData.workmode} onChange={handleChange}>
              <option value="">Select Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
            <input type="text" name="experience" placeholder="Experience (e.g., 2 years)" value={formData.experience} onChange={handleChange} />
            <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
            <button className="submit-btn" type="submit">Update Job</button>
          </form>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data" style={{ display: editId ? 'none' : 'block' }}>
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
        <select name="workmode" value={formData.workmode} onChange={handleChange}>
          <option value="">Select Work Mode</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input type="text" name="experience" placeholder="Experience (e.g., 2 years)" value={formData.experience} onChange={handleChange} />
        <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
        <button className="submit-btn" type="submit">Submit Job</button>
      </form>

      <div className="job-list">
        {jobs.map((job) => (
<div className="job-card" key={job._id}>
            {job.logoURL && <img src={`http://localhost:5000${job.logoURL}`} alt="logo" className="job-logo" />}
            <div className="job-card-body">
              <h3 className="job-title">{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Country:</strong> {job.country}</p>
              <p><strong>Work Mode:</strong> {job.workmode}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
              <p>{job.description}</p>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(job)}><FaEdit /> Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(job._id)}><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
