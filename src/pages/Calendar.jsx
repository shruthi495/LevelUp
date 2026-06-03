import Heatmap from "../components/Heatmap";

function Calendar() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold">
        Calendar Heatmap
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        Daily Productivity Tracking
      </p>

      <Heatmap />
    </div>
  );
}

export default Calendar;