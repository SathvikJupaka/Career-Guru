import React, { useState } from "react";
import "./index.css";

function EditJobModal({ jobDetails, closeModal }) {
  const [updatedJob, setUpdatedJob] = useState({ ...jobDetails });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const updateJobDetails = async (updatedJobDetails) => {
    try {
      const jobId = updatedJobDetails._id; // Assuming _id is the job ID
      delete updatedJobDetails._id; // Remove _id from the updated job details object
  
      const response = await fetch(`/recruiter-api/updateJobDetails/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJobDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update job details');
      }
  
      const updatedData = await response.json();
      return updatedData; // Return the updated job details if needed
    } catch (error) {
      console.error('Error updating job details:', error);
      throw error; // Throw the error for error handling in the component
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobDetails(updatedJob);
    closeModal();
  };

  return (
    <div className="edit-job-modal">
      <div className="edit-job-modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Edit Job Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="positionName">Position Name</label>
            <input
              type="text"
              id="positionName"
              name="positionName"
              value={updatedJob.positionName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={updatedJob.jobType}
              onChange={handleChange}
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lastDate">Last Date</label>
            <input
              type="date"
              id="lastDate"
              name="lastDate"
              value={updatedJob.lastDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="aboutJob">About Job</label>
            <textarea
              id="aboutJob"
              name="aboutJob"
              value={updatedJob.aboutJob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="minQualifications">Minimum Qualifications</label>
            <textarea
              id="minQualifications"
              name="minQualifications"
              value={updatedJob.minQualifications}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsibilities">Responsibilities</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={updatedJob.responsibilities}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ctc">CTC</label>
            <input
              type="text"
              id="ctc"
              name="ctc"
              value={updatedJob.ctc}
              onChange={handleChange}
            />
          </div>
          {/* Add more form fields as needed */}
          <div className="button-container">
            <button type="submit">Update</button>
            <button type="button" onClick={closeModal}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobModal;
