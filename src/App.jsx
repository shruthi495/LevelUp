import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TimeCapsule from "./pages/TimeCapsule";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
const [weekGoals, setWeekGoals] =
  useState(() => {

    const savedGoals =
      localStorage.getItem(
        "weekGoals"
      );

    return savedGoals
      ? JSON.parse(savedGoals)
      : {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        };
  });
  useEffect(() => {
  localStorage.setItem(
    "weekGoals",
    JSON.stringify(weekGoals)
  );
}, [weekGoals]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white flex">

        <Sidebar />

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                weekGoals={weekGoals}
                setWeekGoals={setWeekGoals}
              />
            }
          />

          <Route
            path="/calendar"
            element={
              <Calendar
                weekGoals={weekGoals}
              />
            }
          />

          <Route
            path="/analytics"
            element={
              <Analytics
                weekGoals={weekGoals}
              />
            }
          />
          <Route
  path="/timecapsule"
  element={<TimeCapsule />}
/>
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;