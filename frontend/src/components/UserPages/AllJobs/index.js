// AllJobs.js
import React, { useState, useEffect } from 'react';
import UserNavbar from '../UserNavbar';
import FilterAndSearch from '../FilterAndSearch';
import { BallTriangle } from 'react-loader-spinner';
import NoJobsFoundImg from "../../../assets/no-jobs-view.png";
import UserJob from '../UserJob';
import './index.css';

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appliedJobs,setAppliedJobs]=useState([]);
    const [filters, setFilters] = useState({
        search: '',
        jobType: '',
        sortByDate: '',
    });
    const [refreshAllJobss,setRefreshAllJobss]=useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const userId = userInfo ? userInfo.userId : null;

        const fetchData = async () => {
            try {
                setLoading(true);
                const queryParams = new URLSearchParams(filters);
                // console.log(queryParams);
                // console./log(`http://localhost:5000/user-api/alljobs/${userId}?${queryParams}`)
                const response = await fetch(`/user-api/alljobs/${userId}?${queryParams}`);
                const data = await response.json();
                // console.log(data.applied);
                setJobs(data.jobs);
                setAppliedJobs(data.applied);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [filters,refreshAllJobss]);

    const onApplyFilters=(filtersapply)=>{
        setFilters(filtersapply);
    }
    const onClearFilters=(filtersapply)=>{
        setFilters(filtersapply);
    }

    const refreshAllJobs=(value)=>{
        setRefreshAllJobss(value);
    }

    return (
        <div className="all-jobs-page">
            <UserNavbar />
            <div className='all-jobs-page-jobs-container'>
                <FilterAndSearch
                    onApplyFilters={onApplyFilters}
                    onClearFilters={onClearFilters}
                />
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
                ) : (
                    jobs.length===0?(
                        
                        <div className='no-jobs-found-view'>
                            <h1 className='no-jobs-found-heading'>No Jobs Found!</h1>
                            <img src={NoJobsFoundImg} alt="no-jobs-found" className='no-jobs-found-image'/>
                        </div>
                    ):
                    (<div className="job-container">
                        {/* Render the list of jobs here */}
                        <h1 className='jobs-found-heading'>JOBS</h1>
                        {jobs.map((job) => {
                            const isApplied = appliedJobs.find(appliedJobId => appliedJobId === job["_id"]);
                            return <UserJob key={job["_id"]} job={job} isApplied={isApplied===undefined} refreshAllJobs={refreshAllJobs} />;
                        })}
                    </div> )
                )}
            </div>
        </div>
    );
}

export default AllJobs;
