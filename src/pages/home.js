import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://job-board-app-production.up.railway.app";
const JOBS_URL = `${BASE_URL}/job-board/jobs`;

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(JOBS_URL, {
        method: "GET", mode: "cors",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      fetchJobs();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${JOBS_URL}/search/${query}`, { method: "GET", headers: { "Content-Type": "application/json" } });

      if (!response.ok) throw new Error("Failed to search jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      {/* Search Bar */}
      <div className="text-center">
        <h2 className="fw-bold">Find Your Dream Job Today</h2>
        <p className="text-muted">Search through millions of jobs from top companies worldwide</p>
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            className="form-control w-50 mx-2"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search Jobs
          </button>
          <Link to="/add-job" className="ms-2">
            <button className="btn btn-success">Add Job</button>
          </Link>
        </div>
      </div>

      {loading && <p className="text-center text-primary">Loading jobs...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.job_number} className="col-md-4 mb-3 d-flex">
              <div className="card shadow-sm p-3 mb-4 w-100 h-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.job_title}</h5>
                  <p className="card-text text-muted">
                    <strong>Company:</strong> {job.company_name}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Location:</strong> {Array.isArray(job.location) ? job.location.join(", ") : job.location}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/job/${job.job_number}`} className="btn btn-primary w-100">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
