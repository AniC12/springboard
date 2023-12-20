import '@testing-library/jest-dom';
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "./CompanyCard";

it("renders without crashing", () => {
    render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" logoUrl="test-logo-url.jpg" handle="test-company" />
        </MemoryRouter>
    );
});

it("displays the company name", () => {
    const { getByText } = render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" logoUrl="test-logo-url.jpg" handle="test-company" />
        </MemoryRouter>
    );

    expect(getByText("Test Company")).toBeInTheDocument();
});

it("displays the company description", () => {
    const { getByText } = render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" logoUrl="test-logo-url.jpg" handle="test-company" />
        </MemoryRouter>
    );

    expect(getByText("Test Description")).toBeInTheDocument();
});

it("displays the company logo when logoUrl is provided", () => {
    const { getByAltText } = render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" logoUrl="test-logo-url.jpg" handle="test-company" />
        </MemoryRouter>
    );

    const logoImage = getByAltText("Test Company");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.src).toContain("test-logo-url.jpg");
});

it("does not display a logo when logoUrl is not provided", () => {
    const { queryByAltText } = render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" handle="test-company" />
        </MemoryRouter>
    );

    expect(queryByAltText("Test Company")).not.toBeInTheDocument();
});

it("links to the correct company page", () => {
    const { getByRole } = render(
        <MemoryRouter>
            <CompanyCard name="Test Company" description="Test Description" handle="test-company" />
        </MemoryRouter>
    );

    expect(getByRole('link')).toHaveAttribute('href', '/companies/test-company');
});