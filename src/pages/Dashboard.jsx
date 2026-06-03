import { useState, useEffect } from "react";
import WeekBoard from "../components/WeekBoard";

function Dashboard({
  weekGoals,
  setWeekGoals,
}) {
  const [goalInput, setGoalInput] =
    useState("");

  const todayDay =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

  const [selectedDay, setSelectedDay] =
    useState(todayDay);

  const addGoal = () => {
    if (!goalInput.trim()) return;

    setWeekGoals({
      ...weekGoals,

      [selectedDay]: [
        ...weekGoals[selectedDay],

        {
          id: Date.now(),
          text: goalInput,
          completed: false,
        },
      ],
    });

    setGoalInput("");
  };

  const toggleGoal = (day, id) => {
    setWeekGoals({
      ...weekGoals,

      [day]: weekGoals[day].map(
        (goal) =>
          goal.id === id
            ? {
                ...goal,
                completed:
                  !goal.completed,
              }
            : goal
      ),
    });
  };

  const deleteGoal = (day, id) => {
    setWeekGoals({
      ...weekGoals,

      [day]: weekGoals[day].filter(
        (goal) => goal.id !== id
      ),
    });
  };

  // Today's goals only
  const todayGoals =
    weekGoals[todayDay] || [];

  const completedGoals =
    todayGoals.filter(
      (goal) => goal.completed
    ).length;

  const progress =
    todayGoals.length === 0
      ? 0
      : Math.round(
          (completedGoals /
            todayGoals.length) *
            100
        );

  const todayString = new Date()
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const existingData =
      JSON.parse(
        localStorage.getItem(
          "heatmapData"
        )
      ) || {};

    existingData[todayString] =
      progress;

    localStorage.setItem(
      "heatmapData",
      JSON.stringify(existingData)
    );
  }, [progress, todayString]);

  const currentDate =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <div className="flex-1 p-8">
      <h2 className="text-4xl font-bold">
        Welcome Back 👋
      </h2>

      <p className="text-zinc-400 mt-2">
        Week Lock-In Challenge
      </p>

      <div className="mt-6 mb-6">
        <p className="text-zinc-400 text-lg">
          {currentDate}
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="bg-zinc-900 rounded-xl p-5">
          <h3 className="text-zinc-400">
            Goals Added Today
          </h3>

          <p className="text-3xl font-bold mt-2">
            📝 {todayGoals.length}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5">
          <h3 className="text-zinc-400">
            Goals Completed
          </h3>

          <p className="text-3xl font-bold mt-2">
            🎯 {completedGoals}/
            {todayGoals.length}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5">
          <h3 className="text-zinc-400">
            Progress
          </h3>

          <p className="text-3xl font-bold mt-2">
            📈 {progress}%
          </p>
        </div>

      </div>

      {/* Add Goal Section */}

      <div className="bg-zinc-900 rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Weekly Goal
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter goal..."
            value={goalInput}
            onChange={(e) =>
              setGoalInput(
                e.target.value
              )
            }
            className="flex-1 bg-zinc-800 p-3 rounded-lg outline-none"
          />

          <select
            value={selectedDay}
            onChange={(e) =>
              setSelectedDay(
                e.target.value
              )
            }
            className="bg-zinc-800 p-3 rounded-lg"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <button
            onClick={addGoal}
            className="bg-blue-600 px-5 rounded-lg"
          >
            Add
          </button>

        </div>
      </div>

      {/* Week Board */}

      <WeekBoard
        weekGoals={weekGoals}
        toggleGoal={toggleGoal}
        deleteGoal={deleteGoal}
      />
    </div>
  );
}

export default Dashboard;