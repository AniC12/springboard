import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import Routes from "./Routes";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <Routes />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Routes />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("renders Homepage for the root route", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <UserProvider>
                <Routes />
            </UserProvider>
        </MemoryRouter>,
    );

    expect(screen.getByText(/Welcome Back/)).toBeInTheDocument(); // Adjust based on actual content
});

it("renders LoginForm for /login", () => {
    render(
        <MemoryRouter initialEntries={["/login"]}>
            <Routes />
        </MemoryRouter>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
});