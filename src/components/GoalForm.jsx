function GoalForm({
  goalInput,
  setGoalInput,
  addGoal,
}) {
  return (
    <div className="flex gap-3 mb-5">
      <input
        type="text"
        placeholder="Enter goal..."
        value={goalInput}
        onChange={(e) =>
          setGoalInput(e.target.value)
        }
        className="flex-1 bg-zinc-800 p-3 rounded-lg outline-none"
      />

      <button
        onClick={addGoal}
        className="bg-blue-600 px-5 rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  );
}

export default GoalForm;