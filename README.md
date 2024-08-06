# TradeVault

## Overview

Welcome to TradeVault, your one-stop solution for tracking and managing all your trades. This web application is developed by Ivan Davidov as an exam project for the SoftUni course ReactJS-May 2024. It is developed with React and it utilizes the [SoftUni Practice server](https://github.com/softuni-practice-server/softuni-practice-server).

## About

TradeVault is a comprehensive platform designed to help traders track their trades efficiently. Our goal is to provide traders with the essential tools they need to succeed in the trading world.

## Mission

Our mission is to empower traders by providing a reliable and user-friendly platform that not only tracks their trades but also aids them in achieving their financial goals.

## Functionalities

### Navigation Bar

The navigation bar adapts based on the user's authentication status, offering different functionalities:

- **Authenticated Users:**

  - _All Posted Trades_
  - _Add Trade_
  - _Logout_

- **Unauthenticated Users:**
  - _All Posted Trades_
  - _Login_
  - _Register_

**The navigation also includes market data provided by an external API.**

### Home Page

The content of the home page varies based on the user's authentication status:

- **Authenticated Users:** Redirects to the "Add Trade" page.
- **Unauthenticated Users:** Leads to the "Login/Register" page.

### Footer

Includes sections on:

- **About**
- **Mission**

### Register

- Users can register by providing an email, password, and confirming the password.
- Validation checks include:
  - Email format verification.
  - Password length must be between 6 and 10 characters.
  - The confirmation password must match the original password.
- In case of validation errors or API request failures, an error message is displayed, and the password fields are cleared.

### Login

- Users can log in by providing their email and password.
- In case of any issues with the API request, an error message is displayed, and the password field is cleared.

### All Posted Trades

- All users can view a list of posted trades, including the image, ticker, and date.
- Each trade has a "Details" button, providing access to detailed information about the trade.
- Trades feature a like counter.

### Add Trade

- Registered users can access the "Add Trade" feature, where they can submit a form to post new trades.
- All mandatory fields are validated before submission.
- After posting, the user can edit or delete their trade. These actions require confirmation to proceed.
- Edit/Delete functionalities are accessible only to the trade's author.

### Like Functionality

- Registered users can like other users' trades once.
- After liking, the user sees "Liked!" and the Like button disappears.

### Logout

- The application includes a logout functionality for registered users.

## Getting Started

To get started with TradeVault, clone the repository and follow the setup instructions provided in the documentation.

### Open Terminal in "server" Folder and Run the Server:

`node server.js`

### Open Terminal in "client" Folder and Instal dependencies:

`npm install`<br>
`npm run dev`<br>
Open the following address in your browser [TradeVault](http://localhost:5173/)

### Unit Tests are available:

### E2E Tests in Playwright are available:

To run them, perform the following commands:
`npm install`<br>
`npm test`

We hope you enjoy using TradeVault as much as I enjoyed building it!
