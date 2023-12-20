import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";
import UserContext from "./UserContext";

it("shows login and signup links when logged out", () => {
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ currentUser: null }}>
                <Navigation logout={() => { }} />
            </UserContext.Provider>
        </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
});

it("shows different links when logged in", () => {
    const mockUser = { first_name: "Test", username: "testuser" };
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ currentUser: mockUser }}>
                <Navigation logout={() => { }} />
            </UserContext.Provider>
        </MemoryRouter>
    );

    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText(/Log out/)).toBeInTheDocument();
});