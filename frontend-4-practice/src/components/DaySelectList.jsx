import { fetchToday } from "../api";
import { isSelectable } from "../utils/date";
import { useEffect, useState } from "react";

export function DaySelectList ({
    year,
    month,
    weeks,
    selectedDay, setSelectedDay,
    setSelectedTime})
{
    
    const [today, setToday] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    async function loadToday()
    {
        setIsLoading(true);
        setError(null);

        try
        {
            const data = await fetchToday();
            setToday(data);
        }
        catch (error)
        {
            setError(error);
        }
        finally
        {
            setIsLoading(false);
        }
    }


    useEffect (() => {
        loadToday();
    }, []);

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
                {weeks.map((week) => (
                    <div className="days-row">
                        {week.map((cell) => {
                            const unavailable = cell.otherMonth || !isSelectable(year, month, cell.day, today);
                            const selected = !cell.otherMonth && cell.day === selectedDay;
                            return (
                                <button
                                    className={["day",
                                    unavailable && "unavailable",
                                    selected && "selected"].filter(Boolean).join(" ")}
                                    disabled={unavailable}
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
