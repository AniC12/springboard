import React, { useState } from "react";

function SearchForm({ searchFor }) {

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm("");
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SearchForm;