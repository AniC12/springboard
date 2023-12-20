import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import JoblyApi from "./api";
import { UserProvider } from './testUtils';

// Mock the JoblyApi.getCompany method
jest.mock("./api", () => ({
    getCompany: jest.fn()
}));

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <CompanyDetail />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialEntries={["/company/ibm"]}>
            <UserProvider>
                <Route path="/company/:handle">
                    <CompanyDetail />
                </Route>
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("renders loading state initially", () => {
    JoblyApi.getCompany.mockResolvedValueOnce({ jobs: [] });
    const { getByText } = render(
        <MemoryRouter initialEntries={["/companies/test-company"]}>
            <Route path="/companies/:handle">
                <CompanyDetail />
            </Route>
        </MemoryRouter>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
});

it("displays company details once loaded", async () => {
    const mockCompany = {
        name: "Test Company",
        description: "Test Description",
        jobs: [] // Ensure this is an array
    };
    JoblyApi.getCompany.mockResolvedValueOnce(mockCompany);

    render(
        <MemoryRouter initialEntries={["/companies/test-company"]}>
            <Route path="/companies/:handle">
                <CompanyDetail />
            </Route>
        </MemoryRouter>
    );

    expect(await screen.findByText('Test Company')).toBeInTheDocument();
    expect(await screen.findByText('Test Description')).toBeInTheDocument();
});