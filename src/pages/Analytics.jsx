import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Analytics({
  weekGoals,
}) {

  const weeklyData =
    Object.entries(
      weekGoals
    ).map(([day, goals]) => {

      const completed =
        goals.filter(
          (goal) =>
            goal.completed
        ).length;

      const progress =
        goals.length === 0
          ? 0
          : Math.round(
              (completed /
                goals.length) *
                100
            );

      return {
        day: day.slice(0, 3),
        progress,
      };
    });

  const totalGoals =
    Object.values(
      weekGoals
    ).flat().length;

  const completedGoals =
    Object.values(
      weekGoals
    )
      .flat()
      .filter(
        (goal) =>
          goal.completed
      ).length;

  const completionRate =
    totalGoals === 0
      ? 0
      : Math.round(
          (completedGoals /
            totalGoals) *
            100
        );


  return (
    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold">
        Analytics
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        Track your productivity
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-zinc-400">
            Completion Rate
          </h3>

          <p className="text-4xl font-bold mt-3">
            {completionRate}%
          </p>
        </div>

        

      </div>

      <div className="bg-zinc-900 p-6 rounded-xl mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Weekly Progress
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart
            data={weeklyData}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="progress"
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-zinc-900 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          Weekly Comparison
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={weeklyData}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="progress"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;