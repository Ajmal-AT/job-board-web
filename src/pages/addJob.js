import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://job-board-app-production.up.railway.app";
const JOBS_URL = `${BASE_URL}/job-board/jobs`;
const ADD_JOB_URL = `${JOBS_URL}/save`;

const AddJob = () => {
    const [job, setJob] = useState({
        job_number:"",
        job_title: "",
        company_name: "",
        location: "",
        key_skills: "",
        experience: "",
        salary: "",
        job_posted_date: "",
        job_description: "",
        applyLink: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setJob((prevJob) => ({
            ...prevJob,
            [name]: name === "location" || name === "key_skills" 
                ? value.split(",").map((item) => item.trim())  // Convert comma-separated string to an array
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            job_number: job.job_number,
            job_title: job.job_title,
            company_name: job.company_name,
            location: job.location,
            key_skills: job.key_skills,
            experience: job.experience,
            salary: job.salary,
            job_posted_date: job.job_posted_date,
            job_description: job.job_description,
            applyLink: job.applyLink
        };

        try {
            console.log(jobData);
            
            const response = await fetch(ADD_JOB_URL, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData)
            });

            if (response.status === 201 || response.status === 200) {
                alert("Job added successfully!");
                navigate("/");
            } else {
                alert("Failed to add job. Please try again.");
            }
        } catch (error) {
            console.error("Error adding job:", error);
            alert("An error occurred while adding the job.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Add a Job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="job_number" placeholder="Job Number" value={job.job_number} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="job_title" placeholder="Job Title" value={job.job_title} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="company_name" placeholder="Company" value={job.company_name} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="key_skills" placeholder="Key Skills" value={job.key_skills} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="experience" placeholder="Experience" value={job.experience} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} required style={inputStyle} />
                <input type="date" name="job_posted_date" value={job.job_posted_date} onChange={handleChange} required style={inputStyle} />
                <textarea name="job_description" placeholder="Job Description" value={job.job_description} onChange={handleChange} required style={inputStyle} />
                <input type="url" name="apply_link" placeholder="Job Apply Link" value={job.apply_link} onChange={handleChange} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </div>
    );
};

const inputStyle = { display: "block", marginBottom: "10px", padding: "8px", width: "100%" };
const buttonStyle = { padding: "10px", width: "100%", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" };

export default AddJob;