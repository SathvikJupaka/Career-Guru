import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { BallTriangle } from "react-loader-spinner";
import Job from "../Job";
import NoJobImage from "../../../assets/no-jobs-view.png"
import "./index.css";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const recruiterId = JSON.parse(localStorage.getItem("recruiterInfo")).recruiterId;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("asdadas");
        setLoading(true);
        const options = {
          method: "GET",
        };
        const response = await fetch(
          `/recruiter-api/myjobs/${recruiterId}?sortBy=latest`,
          options
        );
        const data = await response.json();
        console.log(data);
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [recruiterId]);

  const deleteJobById = async (jobId) => {
    const url = `/recruiter-api/deletejob/${jobId}`;

    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);


    setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
    // fetchData();
  };

  return (
    <div className="my-jobs-page">
      <Navbar />
      <div className="my-jobs-container">
        {loading ? (
          <div className='loading-container'>
              <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#4fa94d"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />
          </div>
        ) : jobs.length === 0 ? (
          <div className="no-content-found-container">
            <h1 className="no-content-heading">ZERO JOBS FOUND</h1>
            <img src={NoJobImage} className="no-content-found-image" alt="nocontent"/>
            {/* <h1 className="no-content-heading">POST RELATED JOBS</h1> */}
            <Link to="/recruiter/postjob"><button className="no-content-button">POST</button></Link>
          </div>
        ) : (
          <div className="jobs-container">
            <h2 className="your-jobs-heading">Your Jobs</h2>
            <ul className="my-jobs-list">
              {jobs.map((job) => (
                <Job key={job["_id"]} jobDetails={job} deleteJobById={deleteJobById} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;
