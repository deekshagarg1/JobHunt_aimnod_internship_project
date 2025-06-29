// import React, { useState } from 'react';
// import { FaUserCircle, FaSignOutAlt, FaUser } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// // import {Link} from 'react-router-dom'
// const Navbar = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   // const auth=false;
// const auth = JSON.parse(localStorage.getItem("user"));
// const Navigate =useNavigate();

// function logout(){
//   localStorage.clear();
//   Navigate("/sign")
// }

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="logo">
//         <span className="black">Job</span>
//         <span className="red">Hunt</span>
//       </div>

//       {/* Nav Links */}

// {auth? <>  <div className="nav-links">
//         {/* <a href="#">Home</a>
//         <a href="#">Jobs</a>
//         <a href="#">Browse</a> */}
//         <Link to='/'>Home</Link>
//          <Link to='/job'>jobs</Link>
//           <Link to='/about'>About</Link>
//            {/* <Link to='/login'>Login</Link>
//             <Link to='/sign'>SignUp</Link> */}
        
//       </div>

//       {/* Profile */}
//       <div className="profile-container">
//         <FaUserCircle 
//           className="profile-icon" 
//           size={32} 
//           onClick={() => setIsProfileOpen(!isProfileOpen)} 
//         />
//         {isProfileOpen && (
//           <div className="profile-popup">
//             <p className="profile-title">Experienced software engineer</p>
//             <div className="popup-item">
//               <FaUser /> <span><Link to='/profile'>View Profile</Link></span>
//             </div>
//             <div className="popup-item" onClick={logout}>
//               <FaSignOutAlt /> <span>Logout</span>
//             </div>
//           </div>
//         )}
//       </div>
// </> :<>    <div className="nav-links">
//         {/* <a href="#">Home</a>
//         <a href="#">Jobs</a>
//         <a href="#">Browse</a> */}
//         <Link to='/'>Home</Link>
//          <Link to='/job'>jobs</Link>
//           <Link to='/about'>About</Link>
//            <Link to='/login'>Login</Link>
//             <Link to='/sign'>SignUp</Link>
        
//       </div></>}


    





//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaUser, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?._id) {
      fetch(`http://localhost:5000/user/${auth._id}`)
        .then(res => res.json())
        .then(data => setUserData(data));
    }
  }, [auth]);

  function logout() {
    localStorage.clear();
    navigate("/sign");
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="black">Job</span>
        <span className="red">Hunt</span>
      </div>

      {/* Nav Links */}
      {auth ? (
        <>
          <div className="nav-links">
            <Link to='/'>Home</Link>
            <Link to='/job'>Jobs</Link>
            <Link to='/about'>About</Link>
<Link to='/liked-jobs' ><><FaHeart/></></Link>


  <div className="profile-container">
            {userData?.imageURL ? (
              <img
                src={`http://localhost:5000/${userData.imageURL}`}
                alt="avatar"
                className="profile-avatar"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
            ) : (
              <FaUserCircle
                className="profile-icon"
                size={32}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
            )}
            {isProfileOpen && (
              <div className="profile-popup">
                <p className="profile-title">{userData?.bio || 'Experienced software engineer'}</p>
                <div className="popup-item">
                  <FaUser /> <span><Link to='/profile'>View Profile</Link></span>
                </div>
                <div className="popup-item" onClick={logout}>
                  <FaSignOutAlt /> <span>Logout</span>
                </div>
              </div>
            )}
          </div>

          </div>

          {/* Profile */}
          {/* <div className="profile-container">
            {userData?.imageURL ? (
              <img
                src={`http://localhost:5000/${userData.imageURL}`}
                alt="avatar"
                className="profile-avatar"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
            ) : (
              <FaUserCircle
                className="profile-icon"
                size={32}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
            )}
            {isProfileOpen && (
              <div className="profile-popup">
                <p className="profile-title">{userData?.bio || 'Experienced software engineer'}</p>
                <div className="popup-item">
                  <FaUser /> <span><Link to='/profile'>View Profile</Link></span>
                </div>
                <div className="popup-item" onClick={logout}>
                  <FaSignOutAlt /> <span>Logout</span>
                </div>
              </div>
            )}
          </div> */}
        </>
      ) : (
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <Link to='/job'>Jobs</Link>
          <Link to='/about'>About</Link>
          <Link to='/login'>Login</Link>
          <Link to='/sign'>SignUp</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
