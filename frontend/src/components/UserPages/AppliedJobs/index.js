import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import NoAppliedJobsImg from "../../../assets/no-jobs-view.png";
import UserNavbar from "../UserNavbar";
import AppliedJobCard from "../AppliedJobCard";
import "./index.css";

function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh]=useState(false);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Get userId from localStorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo ? userInfo.userId : null;

        if (!userId) {
          console.error("User information not found in localStorage");
          return;
        }

        // Fetch applied jobs using userId
        const response = await fetch(`/user-api/appliedjobs/${userId}`);
        const data = await response.json();
        setAppliedJobs(data.appliedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [refresh]);

  const refreshAppliedJobs=(value)=>{
    setRefresh(true);
  }

  return (
    <div className="applied-jobs-page">
      <UserNavbar />
      <div className="applied-jobs-container">
        <h2 className="applied-jobs-heading">Applied Jobs</h2>
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
          ) : (appliedJobs===undefined || appliedJobs.length === 0) ? (
              <div className="no-jobs-applied-view">
                  <h1 className="no-jobs-applied-view-heading">No Jobs Applied!</h1>
                  <img src={NoAppliedJobsImg} alt="no-jobs-applied-view" className="no-jobs-applied-view-i" />
                  <Link to="/user/alljobs"><button className="no-jobs-applied-view-apply-now">Apply Now</button></Link>
              </div>
          ) : (
              <div className="applied-jobs-list">
                  {appliedJobs && appliedJobs.map((job) => (
                      <AppliedJobCard jobDetails={job} key={job["_id"]} refreshAppliedJobs={refreshAppliedJobs}/>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
}

export default AppliedJobs;



// import React, { useState, useEffect } from "react";
// import UserNavbar from "../UserNavbar";
// import "./index.css";

// function AppliedJobs() {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         // Get userId from localStorage
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const userId = userInfo ? userInfo.userId : null;

//         if (!userId) {
//           console.error("User information not found in localStorage");
//           return;
//         }

//         // Fetch applied jobs using userId
//         const response = await fetch(`http://localhost:5000/user-api/appliedjobs/${userId}`);
//         const data = await response.json();

//         setAppliedJobs(data.appliedJobs);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching applied jobs:", error);
//         setLoading(false);
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   return (
//     <div className="applied-jobs-page">
//       <UserNavbar />
//       <div>
//         <h2>Applied Jobs</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul>
//             {appliedJobs.map((job) => (
//               <li key={job._id}>
//                 <h3>{job.positionName}</h3>
//                 <p>{job.companyName}</p>
//                 <p>Status: {job.status}</p>
//                 {/* Add more job details as needed */}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AppliedJobs;
