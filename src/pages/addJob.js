import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://job-board-app-production.up.railway.app";
const ADD_JOB_URL = `${BASE_URL}/job-board/jobs/save`;

const AddJob = () => {
    const [job, setJob] = useState({
        job_number: "",
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
                ? value.split("-").map((item) => item.trim())
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            ...job
        };

        try {
            console.log("Submitting Job:", jobData);

            const response = await fetch(ADD_JOB_URL, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData)
            });

            if (response.ok) {
                alert("Job added successfully !");
                navigate("/");
            } else {
                alert("Failed to add job. Please try again.");
            }
        } catch (error) {
            console.error("Error adding job : ", error);
            alert("An error occurred while adding the job");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center fw-bold mb-4">Add a Job</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Job Number</label>
                        <input type="text" name="job_number" className="form-control" placeholder="Enter Job Number" value={job.job_number} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Job Title</label>
                        <input type="text" name="job_title" className="form-control" placeholder="Enter Job Title" value={job.job_title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Company Name</label>
                        <input type="text" name="company_name" className="form-control" placeholder="Enter Company Name" value={job.company_name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Location</label>
                        <input type="text" name="location" className="form-control" placeholder="Enter Location(s) - Separate multiple locations with '-'" value={job.location} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Key Skills</label>
                        <input type="text" name="key_skills" className="form-control" placeholder="Enter Key Skills - Separate multiple skills with '-'" value={job.key_skills} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Experience</label>
                        <input type="text" name="experience" className="form-control" placeholder="Enter Required Experience (e.g., 2-5 years)" value={job.experience} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Salary</label>
                        <input type="text" name="salary" className="form-control" placeholder="Enter Salary Range (e.g., $60K - $80K)" value={job.salary} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Job Posted Date</label>
                        <input type="date" name="job_posted_date" className="form-control" value={job.job_posted_date} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Job Description</label>
                        <textarea name="job_description" className="form-control" placeholder="Enter Job Description" rows="4" value={job.job_description} onChange={handleChange} required />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Apply Link</label>
                        <input type="url" name="applyLink" className="form-control" placeholder="Enter Application Link" value={job.applyLink} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">Submit Job</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
