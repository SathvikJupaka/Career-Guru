import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import EditJobModal from "../EditJobModal";

function Job({ jobDetails, deleteJobById, updateJobById }) {
  const {
    _id,
    companyName,
    companyImageUrl,
    positionName,
    jobType,
    aboutJob,
    lastDate,
    postedOn,
  } = jobDetails;
  // ctc,
  // minQualifications,
  // responsibilities,

  const [showModal, setShowModal] = useState(false);

  const deleteJob = async () => {
    deleteJobById(_id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className="my-job-card">
      <div className="my-company-details">
        <img className="my-company-image" src={companyImageUrl} alt="Company Logo" />
        <div className="my-company-info">
          <h3 className="my-company-name">Company : {companyName}</h3>
          <p className="my-position">Position     : {positionName}</p>
          <p className="my-job-type">Type         : {jobType}</p>
        </div>
        {/* Button to navigate to applications page */}
        <Link to={`/recruiter/applications/${_id}`}>
            <button className="my-applications-button">View Applications</button>
        </Link>
      </div>
      <div className="my-job-description">
        <p className="my-about-job">
          <span className="my-about-job-heading">About</span>
          <br />
          {aboutJob}
        </p>
        <div className="my-dates">
          <p className="my-posted-on">Posted on: {new Date(postedOn).toLocaleDateString()}</p>
          <p className="my-last-date">Last date: {new Date(lastDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="my-action-buttons">
        <button className="my-edit-button" onClick={openModal}>Edit</button>
        <button className="my-delete-button" onClick={deleteJob}>
          Delete
        </button>
      </div>
      {showModal && (
        <EditJobModal
          jobDetails={jobDetails}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Job;
