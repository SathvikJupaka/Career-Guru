import React from "react";
import "./index.css"; 

function getStatusColor(status) {
  switch (status) {
    case "applied":
      return "yellowBackground blackText";
    case "rejected":
      return "redBackground whiteText";
    case "underreview":
      return "orangeBackground whiteText";
    case "selected":
      return "greenBackground whiteText";
    default:
      return "greyBackground";
  }
}

function AppliedJobCard({ jobDetails, refreshAppliedJobs }) {
    // console.log(jobDetails);
  const {
    applicationId,
    companyImageUrl,
    companyName,
    positionName,
    jobType,
    status,
    postedOn,
    lastDate,
    appliedOn,
  } = jobDetails;

  const statusColor = getStatusColor(status).split(" ")[0];
  const statusColorText = getStatusColor(status).split(" ")[1];

  const withdrawApplication= async ()=>{
    const url=`/user-api/withdraw-application/${applicationId}`;
    const options = {
        method: 'DELETE',
    };
    const response=await fetch(url,options);
    const data=await response.json();
    console.log(data);
    refreshAppliedJobs(true);
  }

  return (
    <div className="applied-job-card">
      <div className="company-details-applied">
        <img src={companyImageUrl} alt="Company Logo" className="company-logo-applied"/>
        <div className="details-applied">
          <h2 className="company-name-applied">Company : {companyName}</h2>
          <p className="job-position-applied">Position : {positionName}</p>
          <p className="job-type-applied">JobType : {jobType}</p>
        </div>
        <div className={`status-bar ${statusColor} ${statusColorText}`} >
            {status}
        </div>
      </div>
      <div className="date-section-applied">
         <div className="dates-applied">
           <p className="date-applied">Posted On: {new Date(postedOn).toDateString()}</p>
           <p className="date-applied">Last Date: {new Date(lastDate).toDateString()}</p>
         </div>
         <div className="applied-on-date">
           <p className="date-applied">Applied On: {new Date(appliedOn).toDateString()}</p>
         </div>
       </div>
       <button className="withdraw-button" onClick={withdrawApplication}>Withdraw Application</button>
    </div>
  );
}

export default AppliedJobCard;



// import React from "react";
// import "./index.css"; // Make sure to include your CSS file

// function getStatusColor(status) {
//   switch (status) {
//     case "applied":
//       return "yellowBackground blackText";
//     case "rejected":
//       return "redBackground whiteText";
//     case "under review":
//       return "orangeBackground whiteText";
//     case "selected":
//       return "greenBackground blackText";
//     default:
//       return "greyBackground";
//   }
// }

// function AppliedJobCard({ jobDetails }) {
//   const {
//     companyImageUrl,
//     companyName,
//     positionName,
//     jobType,
//     status,
//     postedOn,
//     lastDate,
//     appliedOn,
//   } = jobDetails;

//   const statusColor = getStatusColor(status).split(" ")[0];
//   const statusColorText = getStatusColor(status).split(" ")[1];

//   return (
//     <div className="applied-job-card">
//       <div className="company-details">
//         <img src={companyImageUrl} alt="Company Logo" className="company-logo"/>
//         <div className="details">
//           <h2 className="company-name">comapny : {companyName}</h2>
//           <p className="job-position">{positionName}</p>
//           <p className="job-type">{jobType}</p>
//         </div>
//         <div className={`status-bar ${statusColor} ${statusColorText}`} >
//             {status}
//         </div>
//       </div>
//       {/* <div className="date-section">
//         <div className="dates">
//           <p className="date">Posted On: {new Date(postedOn).toDateString()}</p>
//           <p className="date">Last Date: {new Date(lastDate).toDateString()}</p>
//         </div>
//         <div className="applied-on-date">
//           <p className="date">Applied On: {new Date(appliedOn).toDateString()}</p>
//         </div>
//       </div>
//       <button className="withdraw-button">Withdraw Application</button> */}
//     </div>
//   );
// }

// export default AppliedJobCard;
