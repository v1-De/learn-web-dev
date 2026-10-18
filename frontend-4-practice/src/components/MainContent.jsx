import { useState } from "react";
import { buildCalendarGrid, getMonthName } from "../utils/date.js";
import { DaySelectList } from "./DaySelectList.jsx";
import { TimeSelectList } from "./TimeSelectList.jsx"; 
import { DaySelectLabels } from "./DaySelectLabels.jsx";

export function MainContent ()
{
    let [year, setYear] = useState(new Date().getFullYear());
    let [month, setMonth] = useState(new Date().getMonth());
    let [weeks, setWeeks] = useState(buildCalendarGrid(year, month));
    let [selectedDay, setSelectedDay] = useState(new Date().getDate());
    let [selectedTime, setSelectedTime] = useState("14:30");

    return (
       <main>      
        <div className="header-row">
          <button type="button" className="back-btn">← Назад</button>
          <h1 className="header-row-label">Пожалуйста, выберите дату и время для записи</h1>
        </div>

        <div className="calendar-time-layout">
          <div className="calendar-select">
            <div className="calendar-header">
              <div className="calendar-label" id = "calendar-label">
                {`${getMonthName(month)} ${year}`}
              </div>
              <div className="btn-group">
                <button className="calendar-control-btn" id = "prev-month-btn"
                onClick={() => 
                    {
                    if (month - 1 >= 0)
                        setMonth(month - 1);
                    else
                    {
                        setMonth(11)
                        setYear(year - 1);
                    }
                                        setSelectedDay(null);
                    setSelectedTime(null);
                }}>&lt;</button>

                <button className="calendar-control-btn" id = "next-month-btn"
                onClick={() => {
                    if (month + 1 <= 11)
                        setMonth(month + 1);
                    else
                    {
                        setMonth(0);
                        setYear(year + 1);
                    }
                    setSelectedDay(null);
                    setSelectedTime(null);
                }}>&gt;</button>
              </div>
            </div>
            <DaySelectLabels />
            <DaySelectList
                year={year}
                month={month}
                weeks={weeks}
                selectedDay={selectedDay} setSelectedDay={setSelectedDay}
                setSelectedTime={setSelectedTime}
            />
          </div>
          <div className="time-select">
            <div className="time-select-header">
              <h1 className="time-select-label">Доступное время</h1>
            </div>
            <TimeSelectList
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDay={selectedDay}
              year={year}
              month={month}/>
          </div>
        </div>
        <div className="footer-cta-bar">
            <div className="footer-cta-content">
              <div className="footer-cta-text">Запись на:</div>
                <div className="footer-cta-text" id = "selected-day">
                    {selectedDay === null ? "": `${String(selectedDay).padStart(2, "0")}.${String(month+1).padStart(2, "0")}.${String(year)},`}
                </div>
                <div className="footer-cta-text" id = "selected-time">
                    {selectedTime===null ? "" : `${selectedTime}`}
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
                    `${String(selectedDay).padStart(2, "0")}.${String(month+1).padStart(2, "0")}.${String(year)}, ${selectedTime}`)
                }}>
                    Далее      
            </button>
        </div>
      </main> 
    );
}