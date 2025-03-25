import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams(); // Get job ID from URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "https://job-board-app-production.up.railway.app";
    const JOBS_URL = `${BASE_URL}/job-board/jobs`;

    // Fetch job details function
    const fetchJobDetails = useCallback(async () => {
        try {
            const response = await fetch(`${JOBS_URL}/get-job/${id}`, {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
            setJob(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]); // Depend on `id` to avoid unnecessary re-renders

    useEffect(() => {
        fetchJobDetails();
    }, [fetchJobDetails]); // Now properly included in dependencies

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{job?.job_title}</h1>
            <p><strong>Company : </strong> {job?.company_name}</p>
            <p><strong>Location : </strong> {job?.location}</p>
            <p><strong>Key Skills : </strong> {job?.key_skills}</p>
            <p><strong>Experience : </strong> {job?.experience}</p>
            <p><strong>Salary : </strong> {job?.salary}</p>
            <p><strong>Date : </strong> {job?.job_posted_date}</p>
            <p><strong>Description : </strong> {job?.job_description}</p>
            
            {job?.applyLink && (
                <p>
                    <strong>Apply Link : </strong> 
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply Here
                    </a>
                </p>
            )}
        </div>
    );
};

export default JobDetails;
