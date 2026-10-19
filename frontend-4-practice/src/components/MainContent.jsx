import { useState, useEffect } from "react";
import { buildCalendarGrid, getMonthName } from "../utils/date.js";
import { DaySelectList } from "./DaySelectList.jsx";
import { TimeSelectList } from "./TimeSelectList.jsx"; 
import { DaySelectLabels } from "./DaySelectLabels.jsx";
import { FooterCta } from "./FooterCta.jsx";
import { fetchToday } from "../api.js";

export function MainContent ()
{
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [weeks, setWeeks] = useState(buildCalendarGrid(year, month));
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    
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
            setToday(new Date(data.year, data.month, data.day));
            setYear(data.year);
            setMonth(data.month);
            setSelectedDay(data.day);
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

    useEffect(() => {
      setWeeks(buildCalendarGrid(year, month))
    }, [year, month])

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
                isLoading={isLoading}
                error={error}
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
      </main> 
    );
}