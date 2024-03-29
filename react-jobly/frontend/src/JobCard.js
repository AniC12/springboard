import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";

function JobCard({ id, title, salary, equity, companyName }) {

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(function updateAppliedStatus() {

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
      digitsRev.push(salaryStr[i]);
      if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
  }

  return (
    <div className="jobCard"> {applied}
      <div>
        <h6>{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        <button
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
