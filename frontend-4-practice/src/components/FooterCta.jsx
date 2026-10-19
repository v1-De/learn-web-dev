import { getDayName } from "../utils/date";

export function FooterCta ({selectedDay, month, year, selectedTime})
{
    let date = new Date(year, month, selectedDay);
        
    return (
        <div className="footer-cta-bar">
            <div className="footer-cta-content">
              <div className="footer-cta-text">Запись на:</div>
                <div className="footer-cta-text" id = "selected-day">
                    {selectedDay === null ? "Выберите день": 
                    `${String(selectedDay).padStart(2, "0")}.${String(month+1).padStart(2, "0")}.${String(year)}, ${getDayName(date.getDay())},`}
                </div>
                <div className="footer-cta-text" id = "selected-time">
                    {selectedDay === null ? "" : selectedTime === null ? "Выберите время" :`${String(selectedTime)}`}
                </div>
            </div>
            <button type="button"
                className={[
                    "next-btn",
                    (selectedDay === null || selectedTime === null) && "disabled"
                ].filter(Boolean).join(" ")}
                disabled={(selectedDay === null || selectedTime === null)}
                id="next-btn" onClick={() => {
                alert("Вы выбрали запись на: " +
                    `${String(selectedDay).padStart(2, "0")}.${String(month+1).padStart(2, "0")}.${String(year)},` +
                    `${String(selectedTime)}`)
                }}>
                    Далее      
            </button>
        </div>
    );
}