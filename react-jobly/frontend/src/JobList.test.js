import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobList from "./JobList";
import JoblyApi from "./api";
import UserContext from './UserContext';

jest.mock("./api", () => ({
    getJobs: jest.fn()
}));

it("renders without crashing", function () {
    render(<JobList />);
});

it("matches snapshot with no jobs", function () {
    const { asFragment } = render(<JobList />);
    expect(asFragment()).toMatchSnapshot();
});

it("renders jobs after API call", async () => {
    const mockJobs = [
        { id: 1, title: "Test Job 1", salary: 100000, equity: "0.1", companyName: "Test Company 1" },
        { id: 2, title: "Test Job 2", salary: 200000, equity: "0.2", companyName: "Test Company 2" }
    ];

    const mockContext = {
        hasAppliedToJob: jest.fn(),
        applyToJob: jest.fn()
    };

    JoblyApi.getJobs.mockResolvedValueOnce(mockJobs);

    render(
        <UserContext.Provider value={mockContext}>
            <MemoryRouter>
                <JobList />
            </MemoryRouter>
        </UserContext.Provider>
    );

    expect(await screen.findByText("Test Job 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Job 2")).toBeInTheDocument();
});
