import { isSelectable } from "../utils/date";

export function DaySelectList ({
    year, setYear,
    month, setMonth,
    weeks, setWeeks,
    selectedDay, setSelectedDay,
    selectedTime, setSelectedTime,
    today})
{
    return (
        <div className="day-select" id = "day-select">
            {weeks.map((week, weekIndex) => (
                <div className="days-row" key={weekIndex}>
                    {week.map((cell) => {
                        const unavailable = cell.otherMonth || !isSelectable(year, month, cell.day, today);
                        const selected = !cell.otherMonth && cell.day === selectedDay;
                        return (
                            <button
                                className={["day",
                                unavailable && "unavailable",
                                selected && "selected"].filter(Boolean).join(" ")}
                                disabled={unavailable}
                                key={cell.day}
                                onClick={() => {
                                    setSelectedTime(null)
                                    setSelectedDay(cell.day)
                                }}>
                                    {cell.day}
                                </button>
                            );
                    })
                }
                </div>
            ))}
        </div>
    );
}
