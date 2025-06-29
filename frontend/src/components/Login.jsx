
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []); // ✅ Only run on mount

  const handelLogin = async () => {
    console.warn(email, password);
    try {
      let result = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      result = await result.json();
      console.warn(result);

      if (result.name) {
        if (typeof localStorage?.setItem === 'function') {
          localStorage.setItem('user', JSON.stringify(result));
          navigate('/');
        } else {
          console.error('localStorage.setItem is not a function!', localStorage);
          alert('Something went wrong. Please refresh your browser.');
        }
      } else {
        alert('Please enter correct details');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="sign-main">
      <div className="sign-center">
        <center><h1>Log In</h1></center>
        <br />
        <div className="log-center">
          <div className="inp1">
            Email: <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="inp1">
            Password: <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <br />
        <button onClick={handelLogin}>Login</button>
        {/* <div className="for">
          <Link to="/forget"><u>Forget Password?</u></Link>
          <Link to="/signup"><p>Sign up</p></Link>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
