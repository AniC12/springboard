import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";


function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <SearchForm searchFor={search} />
      {companies.length > 0
        ? (
          <div className="CompanyList-list">
            {companies.map(c => (
              <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default CompanyList;