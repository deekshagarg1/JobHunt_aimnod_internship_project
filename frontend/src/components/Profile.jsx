// // // Profile.jsx
// // import React, { useEffect, useState } from 'react';
// // // import './Profile.css';

// // const Profile = () => {
// //   const [user, setUser] = useState(null);
// //   const [showEdit, setShowEdit] = useState(false);
// //   const [form, setForm] = useState({});

// //   const userId = JSON.parse(localStorage.getItem('user'))?._id;

// //   useEffect(() => {
// //     fetch(`http://localhost:5000/user/${userId}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setUser(data);
// //         setForm(data);
// //       });
// //   }, [userId]);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleUpdate = async () => {
// //     const res = await fetch(`http://localhost:5000/user/${userId}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(form),
// //     });
// //     const updated = await res.json();
// //     setUser(updated);
// //     setShowEdit(false);
// //   };

// //   if (!user) return <div>Loading...</div>;

// //   return (
// //     <div className="profile-container">
// //       <div className="profile-card">
// //         <div className="edit-btn" onClick={() => setShowEdit(true)}>
// //           <span>&#9998;</span>
// //         </div>
// //         <img
// //           src={user.imageURL ? `http://localhost:5000/${user.imageURL}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
// //           alt="profile"
// //           className="avatar"
// //         />
// //         <h2>{user.name}</h2>
// //         <p>{user.bio || 'Experienced Software Developer'}</p>
// //         <p>
// //           <b>&#9993;</b> {user.email}
// //         </p>
// //         {/* <p>
// //           <b>&#128188;</b> {user.phone || 'N/A'}
// //         </p> */}
// //         <div className="skills">
// //           <p><b>Skills</b></p>
// //           {user.skills?.split(',').map((skill, i) => (
// //             <span key={i}>{skill.trim()}</span>
// //           ))}
// //         </div>
// //         <p><b>Resume</b></p>
// //         <a
// //   href='/src/assets/Deekshagarg resume 2025.docx'
  
// //   target="_blank"
// // >
// //   Download Resume
// // </a>
// //       </div>

// //       <div className="applied-jobs">
// //         <h3>Applied Jobs</h3>
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Date</th>
// //               <th>Job Role</th>
// //               <th>Company</th>
// //               <th>Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr>
// //               <td>2024-12-25</td>
// //               <td>Backend Developer</td>
// //               <td>JobHunt</td>
// //               <td><span className="status">Pending</span></td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>

// //       {showEdit && (
// //         <div className="popup">
// //           <div className="popup-content">
// //             <h3>Edit Profile</h3>
// //             <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
// //             <input name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
// //             <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
// //             <button onClick={handleUpdate}>Update</button>
// //             <button onClick={() => setShowEdit(false)} className="cancel">Cancel</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;





























// import React, { useEffect, useState } from 'react';
// // import './Profile.css'; // You can create your own styles

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [form, setForm] = useState({});

//   const userId = JSON.parse(localStorage.getItem('user'))?._id;




  

//   useEffect(() => {
//     if (userId) {
//       fetch(`http://localhost:5000/user/${userId}`)
//         .then(res => res.json())
//         .then(data => {
//           setUser(data);
//           setForm(data);
//         });
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     const res = await fetch(`http://localhost:5000/user/${userId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const updated = await res.json();
//     setUser(updated);
//     setShowEdit(false);
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="edit-btn" onClick={() => setShowEdit(true)}>
//           ✎
//         </div>
//         <img
//           src={user.imageURL ? `http://localhost:5000/${user.imageURL}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//           alt="Profile"
//           className="avatar"
//         />
//         <h2>{user.name}</h2>
//         <p>{user.bio || 'No bio added'}</p>
//         <p><strong>Email:</strong> {user.email}</p>

//         <div className="skills">
//           <strong>Skills:</strong>
//           <div className="skill-tags">
//             {user.skills?.split(',').map((skill, i) => (
//               <span key={i} className="skill">{skill.trim()}</span>
//             ))}
//           </div>
//         </div>

//         <div className="resume-link">
//           <strong>Resume:</strong>
//           {user.resumeURL ? (
//             <a
//               href={`http://localhost:5000/${user.resumeURL}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download Resume
//             </a>
//           ) : (
//             <p>No resume uploaded</p>
//           )}
//         </div>
//       </div>

//       <div className="applied-jobs">
//         <h3>Applied Jobs</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Job Role</th>
//               <th>Company</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>2024-12-25</td>
//               <td>Backend Developer</td>
//               <td>JobHunt</td>
//               <td><span className="status">Pending</span></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {showEdit && (
//         <div className="popup">
//           <div className="popup-content">
//             <h3>Edit Profile</h3>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
//             <input name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
//             <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
//             <button onClick={handleUpdate}>Update</button>
//             <button onClick={() => setShowEdit(false)} className="cancel">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;























// Profile.jsx
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profileData'));
    if (storedUser) {
      setUser(storedUser);
      setForm(storedUser);
    } else if (userId) {
      fetch(`http://localhost:5000/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setForm(data);
          localStorage.setItem('profileData', JSON.stringify(data));
        });
    }

    const storedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setAppliedJobs(storedAppliedJobs);

    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setAllJobs(data));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updated = {
      ...user,
      ...form
    };
    setUser(updated);
    localStorage.setItem('profileData', JSON.stringify(updated));
    setShowEdit(false);
  };

  if (!user) return <div>Loading...</div>;

  const appliedJobDetails = allJobs.filter(job => appliedJobs.includes(job._id));

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="edit-btn" onClick={() => setShowEdit(true)}>
          ✎
        </div>
        <img
         src={user.imageURL ? `http://localhost:5000/${user.imageURL}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Profile"
          className="avatar"
        />
        <h2>{user.name}</h2>
        <p>{user.bio || 'No bio added'}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {/* <div className="skills">
          <strong>Skills:</strong>
          <div className="skill-tags">
            {user.skills?.split(',').map((skill, i) => (
              <span key={i} className="skill">{skill.trim()}</span>
            ))}
          </div>
        </div> */}

        <div className="skills">
          <strong>Skills:</strong> {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || 'No skills added'}
        </div>

        <div className="resume-link">
          <strong>Resume:</strong>
          {user.resumeURL ? (
            <a
              href={`http://localhost:5000/${user.resumeURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          ) : (
            <p>No resume uploaded</p>
          )}
        </div>
      </div>

      <div className="applied-jobs">
        <h3>Applied Jobs</h3>
        <br />
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Job Role</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobDetails.map(job => (
              <tr key={job._id}>
                <td>{new Date(job.createdAt).toISOString().split('T')[0]}</td>
                <td>{job.title}</td>
                <td>{job.company || 'Unknown'}</td>
                <td><span className="status">Pending</span></td>
              </tr>
            ))}
            {appliedJobDetails.length === 0 && (
              <tr>
                <td colSpan="4">No applied jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEdit && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Profile</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
            <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
            <input name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="Image URL" />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setShowEdit(false)} className="cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
