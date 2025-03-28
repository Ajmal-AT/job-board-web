import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams(); // Get job ID from URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "https://job-board-app-production.up.railway.app";
    const JOBS_URL = `${BASE_URL}/job-board/jobs`;

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
    }, [JOBS_URL, id]); 

    useEffect(() => {
        fetchJobDetails();
    }, [fetchJobDetails]); // Now properly included in dependencies

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
        <div className="card shadow-lg p-4">
            <div className="d-flex align-items-center mb-3">
            <h3 className="fw-bold">{job?.job_title}</h3>
            </div>

            <div className="mb-3">
            <p className="text-muted mb-1">
                <strong>Company :- {job?.company_name} </strong>
            </p>
            <p className="text-muted mb-1">
                <strong>Location :- </strong> {Array.isArray(job?.location) ? job.location.join(", ") : job?.location}
            </p>
            </div>

            <p className="text-gray-600">
            <strong>Key Skills :- </strong>
            {Array.isArray(job?.key_skills) ? job.key_skills.join(", ") : job?.key_skills}
            </p>

            <p className="fw-bold">Job Description :- </p>
            <ul className="text-secondary ps-3">
            {job?.job_description
                ?.split(".")
                .filter(sentence => sentence.trim() !== "")
                .map((sentence, index) => (
                <li key={index} className="text-gray-600">
                    {sentence.trim()}.
                </li>
                ))}
            </ul>

            <p>
            <strong>Experience :- </strong> {job?.experience}
            </p>
            <p>
            <strong>Salary :- </strong>
            <span className="fw-bold fs-5"> {job?.salary}</span>
            </p>

            <p>
                <strong>Date :- </strong>
                {job?.job_posted_date && job.job_posted_date !== "N/A"
                    ? job.job_posted_date
                    : "Today"}
            </p>

            {job?.applyLink && (
                <div className="d-flex mt-3">
                    <div className="mt-4">
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2">
                            Apply Here
                        </a>
                    </div>
                    <div className="mt-4 ms-3">
                        <button onClick={() => window.history.back()} className="btn btn-secondary px-4 py-2">
                            Go Back
                        </button>
                    </div>
                </div>
            )}

        </div>
        </div>
    );
};

export default JobDetails;