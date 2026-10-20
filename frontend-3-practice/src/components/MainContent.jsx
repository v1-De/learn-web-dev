import { useState } from "react";
import { buildCalendarGrid, getMonthName } from "../utils/date.js";
import { DaySelectList } from "./DaySelectList";
import { TimeSelectList } from "./TimeSelectList.jsx"; 
import { DaySelectLabels } from "./DaySelectLabels";
import { useEffect } from "react";
import { FooterCta } from "./FooterCta.jsx";
import { CalendarTimeLayout } from "./CalendarTimeLayout.jsx";

export function MainContent ()
{
    return (
       <main>      
        <div className="header-row">
          <button type="button" className="back-btn">← Назад</button>
          <h1 className="header-row-label">Пожалуйста, выберите дату и время для записи</h1>
        </div>
        <CalendarTimeLayout />
      </main> 
    );
}