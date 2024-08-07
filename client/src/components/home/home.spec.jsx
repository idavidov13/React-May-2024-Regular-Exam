import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./Home";
import { AuthContext } from "../../context/authContext";
import { useGetAllTrades } from "../../hooks/useTrades";

vi.mock("../../hooks/useTrades");

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders welcome message for unauthenticated users", () => {
    useGetAllTrades.mockImplementation(() => [[]]);

    render(
      <AuthContext.Provider value={{ isAuthenticated: false, email: "" }}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Welcome to TradeVault/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Join us today and start tracking your trades with ease./i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Register/i })).toBeInTheDocument();
  });

  it("renders welcome message for authenticated users", () => {
    useGetAllTrades.mockImplementation(() => [[]]);

    render(
      <AuthContext.Provider
        value={{ isAuthenticated: true, email: "test@example.com" }}
      >
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Welcome to TradeVault/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, test@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Add Trade/i })
    ).toBeInTheDocument();
  });
});

describe("HomePage Component Last Trades", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("displays last trades if available", () => {
    useGetAllTrades.mockImplementation(() => [
      [
        { _id: "1", ticker: "AAPL", date: "2024-08-07", entryPrice: 150 },
        { _id: "2", ticker: "GOOGL", date: "2024-08-06", entryPrice: 2800 },
        { _id: "3", ticker: "AMZN", date: "2024-08-05", entryPrice: 3400 },
      ],
    ]);

    render(
      <AuthContext.Provider value={{ isAuthenticated: false, email: "" }}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/AAPL/i)).toBeInTheDocument();
    expect(screen.getByText(/GOOGL/i)).toBeInTheDocument();
    expect(screen.getByText(/AMZN/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /All Trades/i })
    ).toBeInTheDocument();
  });

  it("displays no trades message when there are no trades", () => {
    useGetAllTrades.mockImplementation(() => [[]]);

    render(
      <AuthContext.Provider value={{ isAuthenticated: false, email: "" }}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/No trades available./i)).toBeInTheDocument();
  });
});
