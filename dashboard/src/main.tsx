import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoseApp from "./RoseApp";
import CalendarApp from "./CalendarApp";
import "./index.css";

const listoneRoot = document.getElementById("league-dashboard-root");
const roseRoot = document.getElementById("league-rose-root");
const calendarRoot = document.getElementById("league-calendar-root");

if (listoneRoot) {
  ReactDOM.createRoot(listoneRoot).render(
    <React.StrictMode><App /></React.StrictMode>
  );
}

if (roseRoot) {
  ReactDOM.createRoot(roseRoot).render(
    <React.StrictMode><RoseApp /></React.StrictMode>
  );
}

if (calendarRoot) {
  ReactDOM.createRoot(calendarRoot).render(
    <React.StrictMode><CalendarApp /></React.StrictMode>
  );
}
