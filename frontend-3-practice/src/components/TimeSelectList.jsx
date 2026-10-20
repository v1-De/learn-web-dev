import { useState } from "react";
import { useEffect } from "react";

export function TimeSelectList ({selectedTime, setSelectedTime, selectedDay, year, month})
{
    const [slots, setSlots] = useState([]);
    const date = new Date (year, month, selectedDay)

    useEffect(() => {
        let baseSlots = [
            {time: 10, available: true},{time: 11, available: true},
            {time: 12, available: true},{time: 13, available: true},
            {time: 14, available: true},{time: 15, available: true},
            {time: 16, available: true},{time: 17, available: true},
        ]

        let newSlots = baseSlots.map((slot) => {
            let isAvailable = date.getDay() !== 0 ? ((selectedDay + slot.time) % 3) !== 0 : false;
            
            return {time: slot.time, available: isAvailable}
        });

        setSlots(newSlots);
    },[selectedDay, year, month])
    
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
                        {slot.time + ":00"}
                    </div>
               </button> 
            ))}
        </div>
    );
}
