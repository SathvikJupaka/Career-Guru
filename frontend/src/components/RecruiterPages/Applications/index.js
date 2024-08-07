import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar'; // Import your Navbar component
import ApplicantCard from '../ApplicantCard';
import NoApplicationsImage from "../../../assets/no-jobs-view.png";
import './index.css'; // Import the CSS file
import { toast } from 'react-toastify';

const JobApplicationDetailsPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);

  const handleStatusChange = async  (status,userId) => {
    // Handle the logic to update the application status
    const jobApplicationUpdationDetails={
        userId,
        status,
        jobId,
    }
    const url="/recruiter-api/update-application-status";
    const options = {
        method: 'PUT',
        body: JSON.stringify(jobApplicationUpdationDetails),
        headers: {
          'Content-Type': 'application/json',
        }
      };
    const response=await fetch(url,options);
    const data=await response.json();
    console.log(data);
    toast.success('User Application Status Updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });   
    const updatedUserDetails = userDetails.map(user => {
      if (user.userId === userId) {
        return { ...user, status: status }; // Update the status of the user
      }
      return user;
    });
    setUserDetails(updatedUserDetails);
  };

  useEffect(() => {
    // Fetch job and user details based on the jobId
    // Replace the placeholder API endpoint with your actual API endpoint
    async function fetchData(){
        try{
            const options={
                method:"GET"
            }
            const response=await fetch(`/recruiter-api/job-applications/${jobId}`,options);
            const data=await response.json();  
            console.log(data);
            setJobDetails(data.jobDetails);
            setUserDetails(data.userDetails);
        }
        catch(e){
            console.log("error : ",e.message);
        }

    }
    fetchData();
  }, [jobId]);



  return (
    <div className="job-application-details-container">
      <Navbar />
      <div className="specific-job-details">
        <p className="specific-job-info"><span className='specific-job-info-label'>Position</span> : {jobDetails.positionName}</p>
        <p className="specific-job-info"><span className='specific-job-info-label'>Job Type</span> : {jobDetails.jobType}</p>
        <p className="specific-job-info"><span className='specific-job-info-label'>About</span> : {jobDetails.aboutJob}</p>
        <p className="specific-job-info"><span className='specific-job-info-label'>Minimum Qualifications</span> : {jobDetails.minQualifications}</p>
        <p className="specific-job-info"><span className='specific-job-info-label'>Responsibilities</span> : {jobDetails.responsibilities}</p>
        <p className="specific-job-info"><span className='specific-job-info-label'>CTC</span> : {jobDetails.ctc}</p>
        <div className='specific-job-dates'>
          <p className="specific-job-info"><span className='specific-job-info-label'>Posted On</span> : {new Date(jobDetails.postedOn).toLocaleDateString()}</p>
          <p className="specific-job-info"><span className='specific-job-info-label'>Last Date</span> : {new Date(jobDetails.lastDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="users-applications-details-container">
        <h2 className='users-applications-details-heading'>Applicants </h2>
        {userDetails.length === 0 ? (
          <div className='no-applications-container'>
            <h1 className='no-applications-heading'>No Applications Received</h1>
            <img className='no-applications-image' src={NoApplicationsImage} alt='no-applications' />
          </div>
        ) : (
          userDetails.map((user) => (
            <ApplicantCard key={user.userId} applicantDetails={user} handleStatusChange={handleStatusChange}/>
          ))
        )}
      </div>

    </div>
  );
};

export default JobApplicationDetailsPage;