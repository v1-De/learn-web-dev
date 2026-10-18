import { isSelectable } from "../utils/date";

export function DaySelectList ({
    year, setYear,
    month, setMonth,
    weeks, setWeeks,
    selectedDay, setSelectedDay,
    selectedTime, setSelectedTime})
{
    const tooday = new Date();

    return (
        <div className="day-select" id = "day-select">
            {weeks.map((week) => (
                <div className="days-row">
                    {week.map((cell) => {
                        const unavailable = cell.otherMonth || !isSelectable(year, month, cell.day, tooday);
                        const selected = !cell.otherMonth && cell.day === selectedDay;
                        return (
                            <button
                                className={["day",
                                unavailable && "unavailable",
                                selected && "selected"].filter(Boolean).join(" ")}
                                disabled={unavailable}
                                onClick={() => {
                                    selectedTime=setSelectedTime(null)
                                    selectedDay=setSelectedDay(cell.day)
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
