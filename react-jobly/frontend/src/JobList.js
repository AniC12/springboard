import React, { useState, useEffect } from "react";
import Search from "./SearchForm";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";


function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(function getAllJobsOnMount() {
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <Search searchFor={search} />
            {jobs.length > 0
                ? <JobCardList jobs={jobs} />
                : <p className="lead">Sorry, no results were found!</p>
            }
        </div>
    );
}

export default JobList;
