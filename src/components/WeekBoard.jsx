function WeekBoard({
  weekGoals,
  toggleGoal,
  deleteGoal,
}) {
  const days = Object.keys(weekGoals);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Weekly Lock-In Board
      </h2>

      <div className="grid grid-cols-4 gap-5">

        {days.map((day) => (
          <div
            key={day}
            className="bg-zinc-900 rounded-xl p-4 min-h-[250px]"
          >
            <h3 className="font-bold text-lg mb-4">
              {day}
            </h3>

            <div className="space-y-3">

              {weekGoals[day].length === 0 ? (
                <p className="text-zinc-500 text-sm">
                  No Goals
                </p>
              ) : (
                weekGoals[day].map((goal) => (
                  <div
                    key={goal.id}
                    className="bg-zinc-800 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2">

                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() =>
                          toggleGoal(
                            day,
                            goal.id
                          )
                        }
                      />

                      <span
                        className={
                          goal.completed
                            ? "line-through text-zinc-500"
                            : ""
                        }
                      >
                        {goal.text}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        deleteGoal(
                          day,
                          goal.id
                        )
                      }
                      className="text-red-400 text-sm mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default WeekBoard;