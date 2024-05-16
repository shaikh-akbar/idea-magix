import Dashboard from '../Dashboard'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../../proxy/axiosConfig';
import { toast } from "react-toastify"
import './Instructor.css'

function Instructor() {
    const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await axios.get(`${base_url}instructors/get-all-instructor`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(token){
        console.log(response)
      setInstructors(response.data);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
      // Handle errors (e.g., unauthorized access)
      if (error.response && error.response.status === 403) {
        // Unauthorized access, handle accordingly (e.g., redirect to login page)
        // Example:
        // history.push('/login');
      }
    }
  };
  
  


  return (
   <>
   
   <div className="instructor-list">
            <h2>All Instructors</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {instructors.map((instructor) => (
                        <tr key={instructor.id}>
                            <td>{instructor._id}</td>
                            <td>{instructor.name}</td>
                            {/* Add more table cells for additional data */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

   </>
  )
}

export default Instructor