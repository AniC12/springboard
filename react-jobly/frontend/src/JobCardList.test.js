import React from "react";
import { render, screen } from "@testing-library/react";
import JobCardList from "./JobCardList"
import UserContext from "./UserContext";

const mockJobs = [
    { id: 1, title: "Job 1", salary: 60000, equity: 0.1, companyName: "Company 1" },
    { id: 2, title: "Job 2", salary: 70000, equity: 0.2, companyName: "Company 2" }
];

const mockContext = {
    hasAppliedToJob: jest.fn(),
    applyToJob: jest.fn()
};

it("renders without crashing", () => {

    render(
        <UserContext.Provider value={mockContext}>
            <JobCardList jobs={mockJobs} />
        </UserContext.Provider>
    );
});

it("renders correct number of JobCards", () => {
    render(
        <UserContext.Provider value={mockContext}>
            <JobCardList jobs={mockJobs} />
        </UserContext.Provider>
    );

    const jobCards = screen.getAllByText(/Job/);
    expect(jobCards.length).toBe(mockJobs.length);
});