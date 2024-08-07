// FilterAndSearch.js
import React from 'react';
import { useState } from 'react';
import "./index.css"

function FilterAndSearch({onApplyFilters,onClearFilters}) {
    const [searchValue,setSearchValue]=useState("");
    const [jobType,setjobType]=useState("");
    const [ctc,setCtc]=useState("");
    const [sortByDate,setSortByDate] =useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtersSearch={
            search: searchValue,
            jobType: jobType,
            sortByDate: sortByDate,
        }
        onApplyFilters(filtersSearch);
        // setSearchValue('');
        // setjobType('');
        // setCtc('');
        // setSortByDate('');
    };

    const handleClearFilters = () => {
        const filters={
            search: '',
            jobType: '',
            sortByDate: '',
        }
        onClearFilters(filters);
        setSearchValue(filters.search);
        setjobType(filters.jobType);
        setCtc(filters.ctc);
        setSortByDate(filters.sortByDate);
    };


    const onChangeSearchValue=(event)=>{
        setSearchValue(event.target.value);
    }
    const onChangeJobType=(event)=>{
        setjobType(event.target.value);
    }
    const onChangeCtc=(event)=>{
        setCtc(event.target.value);
    }
    const onChangeSortByDate=(event)=>{
        setSortByDate(event.target.value);
    }
    return (
        <form className="filter-and-search" onSubmit={handleSubmit}>
            <div className='filter-container'>
                <label className='filter-label'>Serach by Position</label>
                <input
                    type="text"
                    name="search"
                    value={searchValue}
                    placeholder="Search by Position"
                    onChange={onChangeSearchValue}
                    className='filter-input'
                />
            </div>
            <div className='filter-container'>
                <label className='filter-label'>Job Type</label>
                <select name="jobType" className='filter-input' value={jobType} onChange={onChangeJobType} defaultValue="">
                    <option disabled value="">choose an option</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>
            <div className='filter-container'>
                <label className='filter-label'>Search by CTC</label>
                <input
                    type="text"
                    name="ctc"
                    value={ctc}
                    onChange={onChangeCtc}
                    placeholder="Search by CTC"
                    className='filter-input'
                    disabled
                />
            </div>
            <div className='filter-container'>
                <label className='filter-label'>Sort by latest</label>
                <select name="sortByDate" className='filter-input' value={sortByDate} onChange={onChangeSortByDate}>
                    <option value="">Sort by Date</option>
                    <option value="latest">Latest</option>
                </select>
            </div>
            <button type="submit" className='filter-input filter-button apply-button' >Apply Filters</button>
            <button type="button" className='filter-input filter-button clear-buttons' onClick={handleClearFilters}>Clear Filters</button>
        </form>
    );
}

export default FilterAndSearch;
