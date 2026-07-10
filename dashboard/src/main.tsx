import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoseApp from "./RoseApp";
import CalendarApp from "./CalendarApp";
import StandingsApp from "./StandingsApp";
import "./index.css";

const listoneRoot = document.getElementById("league-dashboard-root");
const roseRoot = document.getElementById("league-rose-root");
const calendarRoot = document.getElementById("league-calendar-root");
const standingsRoot = document.getElementById("league-standings-root");

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

if (standingsRoot) {
  ReactDOM.createRoot(standingsRoot).render(
    <React.StrictMode><StandingsApp /></React.StrictMode>
  );
}
