import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyList from "./CompanyList";
import JoblyApi from "./api";

// Mock the JoblyApi.getCompanies method
jest.mock("./api", () => ({
    getCompanies: jest.fn()
}));

it("renders without crashing", () => {
    render(<CompanyList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<CompanyList />);
    expect(asFragment()).toMatchSnapshot();
});


it("displays companies after API call", async () => {
    const mockCompanies = [
        { handle: "test1", name: "Test Company 1", description: "Desc 1", logoUrl: "http://test1.jpg" },
        { handle: "test2", name: "Test Company 2", description: "Desc 2", logoUrl: "http://test2.jpg" }
    ];
    JoblyApi.getCompanies.mockResolvedValueOnce(mockCompanies);

    render(
        <MemoryRouter>
            <CompanyList />
        </MemoryRouter>
    );

    expect(await screen.findByText('Test Company 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Company 2')).toBeInTheDocument();
});