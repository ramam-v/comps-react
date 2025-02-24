// index.js - Application Entry Point
// This is the main entry file for the React application

// Import styles
import "./index.css";

// Core React imports
import React from "react";
import ReactDOM from "react-dom/client";

// Import root component and navigation provider
import App from "./App";
import { NavigationProvider } from "./context/navigation";

// =============================================
// React 18 Application Initialization
// =============================================

// Get the root DOM element where React will mount the application
// This element should exist in your index.html file
const el = document.getElementById("root");

// Create a React root using the new React 18 API
// createRoot is part of React 18's concurrent features
const root = ReactDOM.createRoot(el);

// Render the application
// NavigationProvider wraps the App to provide navigation context
// The whitespace in curly braces is optional and can be removed
root.render(
  <NavigationProvider>
    {" "}
    <App />{" "}
  </NavigationProvider>
);

/*
Key Concepts:

1. React 18 Root API:
   - Uses createRoot instead of older render method
   - Enables concurrent features
   - More efficient rendering

2. Context Provider Wrapping:
   - NavigationProvider wraps the entire app
   - Makes navigation context available everywhere
   - Example of the Provider pattern

3. Entry Point Structure:
   - CSS imports
   - Core React imports
   - Component imports
   - Application initialization

4. Modern React Features:
   - React 18 API
   - Context API
   - Concurrent rendering support

Notes:
- The root element must exist in index.html
- Only one createRoot call is needed
- Provider wrapping makes context available to all children
*/
