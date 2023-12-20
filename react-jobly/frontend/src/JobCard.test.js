import '@testing-library/jest-dom';
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import JobCard from "./JobCard";
import UserContext from "./UserContext";
import { UserProvider } from "./testUtils";


const mockApplyToJob = jest.fn();
const mockHasAppliedToJob = jest.fn();

it("matches snapshot", function () {
    let item = { title: "CEO", salary: 1000000, equity: 10 };
    const { asFragment } = render(
        <UserProvider>
            <JobCard item={item} />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("renders job information", () => {
    render(
        <UserContext.Provider value={{ hasAppliedToJob: mockHasAppliedToJob, applyToJob: mockApplyToJob }}>
            <JobCard id={1} title="Test Job" salary={120000} equity={0.1} companyName="Test Company" />
        </UserContext.Provider>
    );

    expect(screen.getByText("Test Job")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText(/Salary:/)).toBeInTheDocument();
    expect(screen.getByText(/Equity:/)).toBeInTheDocument();
});

it("handles apply button click", () => {
    mockHasAppliedToJob.mockReturnValue(false);
    render(
        <UserContext.Provider value={{ hasAppliedToJob: mockHasAppliedToJob, applyToJob: mockApplyToJob }}>
            <JobCard id={1} title="Test Job" salary={120000} equity={0.1} companyName="Test Company" />
        </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Apply"));
    expect(mockApplyToJob).toHaveBeenCalledWith(1);
});