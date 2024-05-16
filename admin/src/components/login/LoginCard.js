import React, { useState } from 'react';
import './LoginCard.css'; // Import your CSS file for styling
import axios from 'axios';
import { base_url } from '../../proxy/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"


const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const token = localStorage.getItem('token');

      const response = await axios.post(`${base_url}user/login`, {
        email,
        password
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        console.log('Login successful');

        console.log('Token:', token);

        localStorage.setItem('token', token);

        // Use the obtained token to make subsequent requests
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

       

        if (user.role === 'admin') {
          localStorage.setItem('userRole', 'admin');
          toast.success('Login successful');
          navigate('/dashboard');
        } else {
          localStorage.setItem('userRole', 'user');
          toast.success('Login successful');
          navigate('/user-dashboard');
        }
      } else {
        console.error('Invalid email or password.');
        toast.error('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };





  return (
    <div className="login-card-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
