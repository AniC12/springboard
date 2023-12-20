import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import UserContext from "./UserContext";

jest.mock("./api");

const mockCurrentUser = {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "testuser@test.com",
};

beforeEach(() => {
    render(
        <UserContext.Provider value={{ currentUser: mockCurrentUser, setCurrentUser: jest.fn() }}>
            <ProfileForm />
        </UserContext.Provider>
    );
});

it("renders with current user data", () => {
    expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testuser@test.com")).toBeInTheDocument();
});
