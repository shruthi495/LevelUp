import MonthHeatmap from "./MonthHeatmap";

function Heatmap() {
  const heatmapData =
    JSON.parse(
      localStorage.getItem("heatmapData")
    ) || {};

  const getColor = (value) => {
    if (value === undefined)
      return "bg-zinc-800";

    if (value === 0)
      return "bg-zinc-700";

    if (value < 40)
      return "bg-red-500";

    if (value < 80)
      return "bg-yellow-500";

    return "bg-green-500";
  };

  const currentYear =
    new Date().getFullYear();

  const startDate = new Date(
    currentYear,
    0,
    1
  );

  const endDate = new Date(
    currentYear,
    11,
    31
  );

  const days = [];

  let current = new Date(startDate);

  while (current <= endDate) {
    const dateString = current
      .toISOString()
      .split("T")[0];

    days.push({
      date: dateString,
      progress:
        heatmapData[dateString],
    });

    current.setDate(
      current.getDate() + 1
    );
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const months = Array.from(
    { length: 12 },
    (_, monthIndex) => ({
      monthName:
        monthNames[monthIndex],

      days: days.filter((day) => {
        const date = new Date(
          day.date
        );

        return (
          date.getMonth() ===
          monthIndex
        );
      }),
    })
  );

  return (
    <div className="overflow-x-auto">

      <div className="flex gap-10 pb-4">

        {months.map((month) => (
          <MonthHeatmap
            key={month.monthName}
            monthName={
              month.monthName
            }
            days={month.days}
            getColor={getColor}
          />
        ))}

      </div>

      <div className="flex gap-6 mt-8 text-sm text-zinc-400">
        <span>⬛ No Data</span>
        <span>🟥 1-39%</span>
        <span>🟨 40-79%</span>
        <span>🟩 80-100%</span>
      </div>
    </div>
  );
}

export default Heatmap;