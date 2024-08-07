import React from 'react';
import './index.css'; 
import Popup from 'reactjs-popup';

function ApplicantCard({ applicantDetails, handleStatusChange }) {
  const { userId, username, email, phoneNumber, skills, educationDetails, status, resume } = applicantDetails;
  return (
    <div className={`applicant-user-card applicant-${status.toLowerCase()}`}>
      <div className="applicant-user-info">
        <p className="applicant-info-item">Name: {username}</p>
        <p className="applicant-info-item">Email: {email}</p>
        <p className="applicant-info-item">Phone: {phoneNumber}</p>
        <p className="applicant-info-item">Skills: {skills}</p>
        <p className="applicant-info-item">Education: {educationDetails}</p>
      </div>
      <div className="applicant-application-status">
      <Popup
            trigger={<button className="button">View Resume</button>}
            modal
            nested
        >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">Resume Preview</div>
                  <div className="content">
                    {resume ? (
                      <iframe src={resume} title="Resume" width="100%" height="500px"></iframe>
                    ) : (
                      <p className='resume-not-found-heading'>Resume not available</p>
                    )}
                  </div>
                  <div className="actions">
                    <button className="button" onClick={close}>
                      Close
                    </button>
                  </div>
                </div>
              )}
        </Popup>
        <p className="applicant-status-text">Status: {status}</p>
        <div className="applicant-action-buttons">
          <button className="applicant-accept-button applicant-button" onClick={() => handleStatusChange('selected', userId)}>
            Accept
          </button>
          <button className="applicant-reject-button applicant-button" onClick={() => handleStatusChange('rejected', userId)}>
            Reject
          </button>
          <button className="applicant-review-button applicant-button" onClick={() => handleStatusChange('underreview', userId)}>
            Under Review
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default ApplicantCard;
