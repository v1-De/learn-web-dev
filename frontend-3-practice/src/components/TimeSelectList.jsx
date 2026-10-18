import { isSelectable } from "../utils/date";

export function TimeSelectList ({selectedTime, setSelectedTime, selectedDay})
{
    const slots = [
        {time: 10, available: false}, {time: 11, available: false},
        {time: 12, available: true}, {time: 13, available: true},
        {time: 14, available: true}, {time: 15, available: true},
        {time: 16, available: true}, {time: 17, available: true}
    ];
    
    return (
        <div className="time-select-list" id = "time-select-list">
            {slots.map ((slot) => 
                (<button className={[
                    "time-select-item",
                    (!slot.available || selectedDay === null) && "unavailable",
                    (selectedTime === slot.time) && "selected"
                ].filter(Boolean).join(" ")}
                
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
