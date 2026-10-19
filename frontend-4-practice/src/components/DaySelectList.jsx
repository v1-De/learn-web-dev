import { isSelectable } from "../utils/date";

export function DaySelectList ({
    year,
    month,
    weeks,
    selectedDay, setSelectedDay,
    setSelectedTime,
    isLoading, error,
    today})
{
    if (error)
    {
        console.error(error)
        return (
            <div style={{fontSize: "30px", color: "#ff0000ff", fontWeight: "bold", display: "flex", justifyContent: "center"}}>
                Ошибка при загрузке данных!
            </div>
        );
    };

    if (isLoading)
        return(
            <div style={{fontSize: "30px", color: "#fff", fontWeight: "bold", display: "flex", justifyContent: "center"}}>
                Загрузка...
            </div>
        );
    else
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
