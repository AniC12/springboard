import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { UserProvider } from "./testUtils";
import PrivateRoute from "./PrivateRoute";

it("redirects to login if not logged in", () => {
    render(
        <MemoryRouter>
            <UserProvider value={{ currentUser: null }}>
                <PrivateRoute path="/private">
                    <div>Private Page</div>
                </PrivateRoute>
                <Route path="/login">
                    <div>Login Page</div>
                </Route>
            </UserProvider>
        </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
});

it("renders the child component if logged in", () => {
    const mockUser = { username: "testuser" };
    render(
        <MemoryRouter initialEntries={["/private"]}>
            <UserProvider value={{ currentUser: mockUser }}>
                <PrivateRoute path="/private">
                    <div>Private Page</div>
                </PrivateRoute>
            </UserProvider>
        </MemoryRouter>
    );

    expect(screen.getByText("Private Page")).toBeInTheDocument();
});

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
