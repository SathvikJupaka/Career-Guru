import React from 'react';
import './index.css';
import { toast} from 'react-toastify';

function UserJob({ job,isApplied ,refreshAllJobs}) {
    const {
        _id,
        companyImageUrl,
        companyName,
        positionName,
        jobType,
        aboutJob,
        ctc,
        postedOn,
        lastDate,
        postedBy,
    } = job;
    const formattedPostedDate = new Date(postedOn).toLocaleDateString();
    const formattedLastDate = new Date(lastDate).toLocaleDateString();
    // console.log(isApplied);

    const applyJob=async ()=>{
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const userId = userInfo ? userInfo.userId : null;
        const appliedDetails={
            jobId:_id,
            recruiterId:postedBy,
            userId,
            status:"applied",
        }
        const url="/user-api/applyjob";
        const options = {
            method: 'POST',
            body: JSON.stringify(appliedDetails),
            headers: {
              'Content-Type': 'application/json',
            }
        };
        const response=await fetch(url,options);
        const data=await response.json();
       toast.success('Application Submitted Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastStyle: { width: '400px' } // Adjust the width value as needed
        });
        console.log(data);
        refreshAllJobs(true);
    }

    return (
        <div className="user-job-card">
            <div className="company-info">
                <div className='company-image-container'>
                    <img className="company-image" src={companyImageUrl} alt="Company Logo" />
                </div>
                <div className="company-details">
                    <h2 className="company-name">Company : {companyName}</h2>
                    <p className="position">position : {positionName}</p>
                    <p className="job-type">job-type : {jobType}</p>
                </div>
            </div>
            {/* <hr className='horizontal-line' /> */}
            <div className="about-job">
                <h3>About the Job</h3>
                <p>{aboutJob}</p>
            </div>
            <hr className='horizontal-line' />
            <div className="dates">
                <p className="posted-date">Posted on : {formattedPostedDate}</p>
                <p className="last-date">Last Date : {formattedLastDate}</p>
            </div>
            {/* <hr className='horizontal-line' /> */}
            <div className="ctc">
                <h3>Stipend : </h3>
                <p>${ctc}</p>
            </div>
            {/* <hr className='horizontal-line' /> */}
            {isApplied ?<button className="apply-job-button" onClick={applyJob}>Apply Now</button>:
            <button className='applied-button' disabled>applied</button>}
        </div>
    );
}

export default UserJob;
