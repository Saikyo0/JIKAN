import React, { useState } from 'react';
import '../App.css'; 
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    console.log(email); 
    if (email === "email@email.com") {
      sessionStorage.setItem('login', 'true');
      window.location = "/profile";
    } else {
      console.log("Invalid email"); 
    }
  }

  return (
    <>
      <style>{`
        #root { 
          background-image: url("../src/assets/loginbg.png"); 
          background-repeat: no-repeat; 
          display: flex;    
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
        }
        .header {
          display: none;
        }
      `}</style>

      <div className="container">
        <style>{`
          .container {
            height: 487px;
            width: 750px;
            border: 1px solid;
            border-radius: 20px;
            background-color: #e4e4e4;
          }
        `}</style>
        <div className='signin'>
          <h1><a href='/'>&lt;</a>Sign in to your account</h1>
          <form className='loginForm' onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              className='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className='forgot'>forgot password?</a>
            <button type="submit">SIGN IN</button>
            <p className='ptop'>Don’t have an account? <a>Sign Up</a></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;