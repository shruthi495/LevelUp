import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-zinc-900 p-6">
      <h1 className="text-2xl font-bold mb-10">
        HabitTracker
      </h1>

      <ul className="space-y-4">
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/calendar">Calendar</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
  <Link to="/timecapsule">
    Time Capsule
  </Link>
</li>

        
      </ul>
    </div>
  );
}

export default Sidebar;