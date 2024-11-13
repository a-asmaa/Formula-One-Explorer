# Formula One Explorer

## Overview
The Formula One Explorer is a React-based web application that provides users with a comprehensive view of Formula One race data, including race results, circuit details, and seasonal statistics. The app is designed to offer a seamless user experience with interactive data presentation and navigation.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technical Approach](#technical-approach)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)

## Getting Started
This guide will walk you through the process of setting up and running the Formula One Explorer on your local development environment.

## Project Structure
The project is organized into the following main directories:
- **src/components**: Reusable UI components.
- **src/pages**: Contains page-level components such as `RaceList` and `SeasonDetails`.
- **src/service**: API service calls.
- **src/types**: TypeScript type definitions.
- **src/utils**: Utility functions used across the app.
- **public**: Static files.

## Technical Approach
The application follows a modular and maintainable architecture, leveraging React and Ant Design for the UI. The main technical decisions include:

- **React with TypeScript**: Ensures type safety and improves code quality.
- **Ant Design**: Used for consistent UI components.
- **React Router**: Manages client-side routing for navigation.
- **API Integration**: `getSeasonRace` and other service functions handle data fetching from [Ergast API](https://ergast.com/mrd/).
- **LocalStorage**: Used for persisting user preferences (e.g., pinned races).
- **Date-fns**: Helps format date values efficiently.

Technical Approach

# Formula One Explorer

## Overview
The Formula One Explorer is a React-based web application that provides users with a comprehensive view of Formula One race data, including race results, circuit details, and seasonal statistics. The app is designed to offer a seamless user experience with interactive data presentation and navigation.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technical Approach](#technical-approach)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)

## Getting Started
This guide will walk you through the process of setting up and running the Formula One Explorer on your local development environment.

## Project Structure
The project is organized into the following main directories:
- **src/components**: Reusable UI components.
- **src/pages**: Contains page-level components such as `RaceList` and `SeasonDetails`.
- **src/service**: API service calls.
- **src/types**: TypeScript type definitions.
- **public**: Static files.

## Technical Approach

Note: For persistent favorite races, there's another approach to use Zustand/Redux, but as we don't need to use a store in the app, using local storage is sufficient for simple apps.
The application follows a modular and maintainable architecture, leveraging React and Ant Design for the UI. The main technical decisions include:

- **React with TypeScript**: Ensures type safety and improves code quality.
- **Ant Design**: Used for consistent UI components.
- **React Router**: Manages client-side routing for navigation.
- **API Integration**: `getSeasonRace` and other service functions handle data fetching.
- **LocalStorage**: Used for persisting user preferences (e.g., pinned races).
- **Date-fns**: Helps format date values efficiently.

### Key Features
- View races by season.
- Pin favorite races for quick access.
- Interactive UI with card and table views.

Note: for Presistent favorite races, there's another aproach to use zustand/ redux but as we don't need to use store in the app, using local storgae for simple apps.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/a-asmaa/Formula-One-Explorer.git
   cd Formula-One-Explorer
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed. Run the following command to install project dependencies:
   ```bash
   npm install
   ```

## Running the Project

1. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app should now be running on `http://localhost:3000/`.

2. **Build for Production**:
   To create a production-ready build, run:
   ```bash
   npm run build
   ```
   This will output a minified version of the app in the `build` directory.

3. **Run test cases**:
   ```bash
   npm run test
   ```

## Technologies Used
- **React** (v18)
- **TypeScript**
- **Ant Design** >> UI library
- **React Router**
- **Date-fns**
- **LocalStorage API**
