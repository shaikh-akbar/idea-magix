import React, { useState } from 'react';
import axios from 'axios';
import './AddCourse.css'
import { base_url } from '../../../proxy/axiosConfig';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        description: '',
      
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithImage = new FormData();
              formDataWithImage.append('name', formData.name);
            formDataWithImage.append('level', formData.level);
            formDataWithImage.append('description', formData.description);
            const token = localStorage.getItem('token');
            const response = await axios.post(`${base_url}courses/create-course`, {
                
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` 
                    }
                  
            });

            console.log('Course added successfully:', response.data);
        } catch (error) {
            console.error('Error adding course:', error.response.data.error);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter course name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="level">Level:</label>
                    <input
                        type="text"
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        placeholder="Enter course level"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                    ></textarea>
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>

    );
};

export default AddCourse;
