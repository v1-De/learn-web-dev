import { useState, useEffect } from "react";
import { buildCalendarGrid, getMonthName } from "../utils/date.js";
import { FooterCta } from "./FooterCta.jsx";
import { DaySelectList } from "./DaySelectList";
import { TimeSelectList } from "./TimeSelectList.jsx"; 
import { DaySelectLabels } from "./DaySelectLabels";

export function CalendarTimeLayout ()
{
    let [year, setYear] = useState(new Date().getFullYear());
    let [month, setMonth] = useState(new Date().getMonth());
    let [weeks, setWeeks] = useState([]);
    let [selectedDay, setSelectedDay] = useState(new Date().getDate());
    let [selectedTime, setSelectedTime] = useState(null);
    const today = new Date();
    
    useEffect (() => {
      setWeeks(buildCalendarGrid(year, month));
    }, [month, year])
    
    return (
    <>
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
                      if (month - 1 < today.getMonth() && year === today.getFullYear())
                        return;
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
                year={year} setYear={setYear}
                month={month} setMonth={setMonth}
                weeks={weeks} setWeeks={setWeeks}
                selectedDay={selectedDay} setSelectedDay={setSelectedDay}
                selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                today={today}
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
        <FooterCta
                selectedDay={selectedDay}
                month={month}
                year={year}
                selectedTime={selectedTime}/>
    </>
    )
}