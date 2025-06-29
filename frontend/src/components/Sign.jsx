// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const Sign = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const[bio , setBio]=useState('')
//   const[skills , setskills]=useState("")
//   const[resumeURL , setresume]=usestate("")
//   const[imageUrl, setimage]=usestate("")
//   const navigate = useNavigate();

//   const collectData = async () => {
//     console.warn(name, email, password);
//     try {
//       let result = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       result = await result.json();
//       console.log(result);

//       if (typeof localStorage?.setItem === 'function') {
//         localStorage.setItem('user', JSON.stringify(result));
//         navigate('/');
//       } else {
//         console.error('localStorage.setItem is not a function!', localStorage);
//         alert('Something went wrong. Please refresh your browser.');
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       alert('Failed to register. Please try again later.');
//     }
//   };

//   return (
//     <div className="sign-main">
//       <div className="sign-center">
//         <center><h1>Sign Up</h1></center>
//         <br />
//         <div className="inp1">
//           Name: <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div className="inp1">
//           Email: <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="inp1">
//           Password: <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
//         </div>
//          <div className="inp1">
//           Bio: <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div className="inp1">
//           Email: <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="inp1">
//           Password: <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <br />
//         <button onClick={collectData}>Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default Sign;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Sign.css';

export const Sign = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const collectData = async () => {
    if (!name || !email || !password) {
      alert("Please fill required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('bio', bio);
    formData.append('skills', skills);
    if (image) formData.append('image', image);
    if (resume) formData.append('resume', resume);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/');
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="sign-main">
      <div className="sign-center">
        <h2>Sign Up</h2>

        <input type="text" placeholder="Name*" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password*" onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
        <input type="text" placeholder="Skills (comma separated)" onChange={(e) => setSkills(e.target.value)} />

        <label className="file-label">
          Upload Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>

        <label className="file-label">
          Upload Resume:
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} />
        </label>

        <button onClick={collectData}>Register</button>
      </div>
    </div>
  );
};

export default Sign;
