# TradeVault

## Overview

Welcome to TradeVault, your one-stop solution for tracking and managing all your trades. This web application is developed by Ivan Davidov as an exam project for the SoftUni course ReactJS-May 2024. It is developed with React and utilizes a custom back-end service.

## About

TradeVault is a comprehensive platform designed to help traders track their trades efficiently. Our goal is to provide traders with the essential tools they need to succeed in the trading world.

## Mission

Our mission is to empower traders by providing a reliable and user-friendly platform that not only tracks their trades but also aids them in achieving their financial goals.

## Functionalities

### Public Part

The public part of TradeVault includes:

- **Home Page:** General information about TradeVault and links to login or register.
- **Login:** Allows existing users to log in using their email and password.
- **Register:** Enables new users to create an account by providing an email, password, and confirming the password.
- **All Posted Trades:** Displays a catalog of all trades posted by users, with details accessible to both authenticated and unauthenticated users.

### Private Part (User Area)

Registered users have access to additional features:

- **Add Trade:** Allows users to post new trades by submitting a form with all necessary details.
- **Edit/Delete Trade:** Users can edit or delete their own trades. These actions are protected by confirmation dialogs.
- **Like Trades:** Logged-in users can like other users' trades, with each trade limited to one like per user.

### Navigation Bar

The navigation bar adapts based on the user's authentication status, offering different functionalities:

- **Authenticated Users:**

  - Information about last trading date and price of the SP500, provided by external API
  - _All Posted Trades_
  - _Add Trade_
  - _Logout_

- **Unauthenticated Users:**
  - Information about last trading date and price of the SP500, provided by external API
  - _All Posted Trades_
  - _Login_
  - _Register_

### Footer

Includes sections on:

- **About**
- **Mission**

## Technologies Used

### Front-end

- **React.js:** Utilized for building the user interface as a Single Page Application (SPA).
  - **React Hooks:** Used for state and lifecycle management.
  - **Context API:** Employed for state management across components.
  - **React Router:** Implements client-side routing to at least 5 pages, with at least 2 pages taking parameters.
  - **Synthetic Events:** Handled various user interactions.
  - **Component Lifecycle:** Managed component mount, update, and unmount processes.

### Back-end

- **SoftUni Practice Server** - since the main focus is on the front-end of the application, I decided to use the provided server.

### External APIs and Services

- **Market Data API:** Alpha Vantage is the chosen provider. There is a limit of 25 API calls per day.

### Error Handling and Data Validation

- Applied error handling and data validation throughout the application to ensure a robust user experience and to prevent crashes.

## Project Structure

The application is divided into the following main parts:

- **Components:** Modular React components organized in a logical folder structure.
- **Services:** Handles API calls and data fetching.
- **Styles:** External CSS files for component styling.
- **Custom Hooks:** Encapsulate and reuse stateful logic across multiple components.

## Getting Started

To get started with TradeVault, clone the repository and follow the setup instructions provided in the documentation.

### Open Terminal in "server" Folder and Run the Server:

`node server.js`

### Open Terminal in "client" Folder and Instal dependencies:

`npm install`<br>
`npm run dev`<br>
Open the following address in your browser [TradeVault](http://localhost:5173/)

### Unit Tests are available:

To run them, perform the following command in terminal for src folder:
`npm run test`

### E2E Tests in Playwright are available:

The test has the following parameters added `test.use({ launchOptions: { slowMo: 2500 } });
test.setTimeout(480000);`. This is made with presentation purpose. If you want to slow down/fast forward the text execution, please modify slowMo parameter (in milliseconds)<br>

To run them, perform the following commands:
`npm install`<br>
`npm test`

We hope you enjoy using TradeVault as much as I enjoyed building it!
