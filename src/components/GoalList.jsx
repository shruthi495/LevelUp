function GoalList({
  goals,
  toggleGoal,
  deleteGoal,
}) {
  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="bg-zinc-800 p-3 rounded-lg flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() =>
                toggleGoal(goal.id)
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
              deleteGoal(goal.id)
            }
            className="text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default GoalList;