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
    console.log("Fetching jobs from API...");
    try {
      const response = await fetch(JOBS_URL, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Fetched jobs:", data);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
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
    console.log(`Searching jobs with query: ${query}`);
    try {
      const response = await fetch(`${JOBS_URL}/search/${query}`, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to search jobs");
      const data = await response.json();
      console.log("Search results:", data);
      setJobs(data);
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6"> Job Board </h1>

        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 border rounded-lg w-full max-w-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            Search
          </button>
          <Link to="/add-job">
            <button className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md">
              Add Job
            </button>
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500 animate-pulse">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.job_number}
                className="p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800">{job.job_title}</h3>
                <p className="text-gray-600"><strong>Company : </strong> {job.company_name}</p>
                <p className="text-gray-600"><strong>Location : </strong> {job.location}</p>
                <Link to={`/job/${job.job_number}`}>
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                    View Details
                  </button>
                </Link>

                <p className="text-gray-600"><strong>  ----------------------------------------------------------------------------
                  ---------------------------------------------------------------------------------------------------------------
                  -----------------------------------------</strong></p>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No jobs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;