import { fetchSlots } from "../api";
import { useState, useEffect } from "react";

export function TimeSelectList ({selectedTime, setSelectedTime, selectedDay, year, month})
{
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadSlots(date)
    {
        setIsLoading(true);
        setError(null)

        try
        {
            const data = await fetchSlots(date);
            setSlots(data.slots);
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
        if (selectedDay !== null)
            loadSlots({day: selectedDay, year: year, month: month})
        else
            setSlots([])
        
    }, [selectedDay, year, month])

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
        <div className="time-select-list" id = "time-select-list">
            {slots.map ((slot, slotIndex) => 
                (<button className={[
                    "time-select-item",
                    (!slot.available || selectedDay === null) && "unavailable",
                    (selectedTime === slot.time) && "selected"
                ].filter(Boolean).join(" ")}
                key={slotIndex}
                disabled={(!slot.available || selectedDay === null) }
                onClick={() => {
                    setSelectedTime(slot.time)
                }}>
                    <div className="time">
                        {slot.time}
                    </div>
               </button> 
            ))}
        </div>
    );
}
