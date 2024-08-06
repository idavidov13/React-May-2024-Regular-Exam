import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, describe } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Mission")).toBeInTheDocument();
  });

  it("renders the home page on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to TradeVault/i)).toBeInTheDocument();
  });

  it("renders the not found page on an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Oops! The page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });

  it("renders the login page on a login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/IvanDavidov@softuni.bg/i)
    ).toBeInTheDocument();
  });

  it("renders the register page on a register route", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/IvanDavidov@softuni.bg/i)
    ).toBeInTheDocument();
  });

  it("route to login page for guarded add-trade page", () => {
    render(
      <MemoryRouter initialEntries={["/add-trade"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/IvanDavidov@softuni.bg/i)
    ).toBeInTheDocument();
  });

  it("route to login page for guarded edit page", () => {
    render(
      <MemoryRouter
        initialEntries={["/trades/2cbc288c-f6e9-40ca-9bca-54549ca3f723/edit"]}
      >
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/IvanDavidov@softuni.bg/i)
    ).toBeInTheDocument();
  });
});
