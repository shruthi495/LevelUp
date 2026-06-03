function MonthHeatmap({
  monthName,
  days,
  getColor,
}) {
  return (
    <div className="min-w-fit">
      <h3 className="text-center text-zinc-300 mb-3 font-semibold">
        {monthName}
      </h3>

      <div
        className="grid gap-1"
        style={{
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(7, 12px)",
        }}
      >
        {days.map((day) => (
          <div
            key={day.date}
            title={`${day.date} - ${
              day.progress ?? 0
            }%`}
            className={`w-3 h-3 rounded-sm ${getColor(
              day.progress
            )}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthHeatmap;