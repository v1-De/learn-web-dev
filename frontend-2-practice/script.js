// 1. ДАННЫЕ
const slots = [
    {time: 10, available: false}, {time: 11, available: false},
    {time: 12, available: true}, {time: 13, available: true},
    {time: 14, available: true}, {time: 15, available: true},
    {time: 16, available: true}, {time: 17, available: true}
];
const tooday = new Date();

// 2. СОСТОЯНИЕ
let year = 2026;
let month = 9;
let selectedDay = 12;
let selectedTime = 12;

// 3. ЧИТСЫЕ ФУНКЦИИ
function getMonthName (month)
{
    let name = "";

    switch (month)
    {
        case 0: name = "Январь"; break;
        case 1: name = "Февраль"; break;
        case 2: name = "Март"; break;
        case 3: name = "Апрель"; break;
        case 4: name = "Май"; break;
        case 5: name = "Июнь"; break;
        case 6: name = "Июль"; break;
        case 7: name = "Август"; break;
        case 8: name = "Сентябрь"; break;
        case 9: name = "Октябрь"; break;
        case 10: name = "Ноябрь"; break;
        case 11: name = "Декабрь"; break;
    }

    return name;
}

function compareDates (a, b)
{
    const d1 = new Date(a.year, a.month, a.day);
    const d2 = new Date(b.year, b.month, b.day);
    if (d1 < d2) return -1;
    if (d2 < d1) return 1;
    return 0;
}

function buildCalendarGrid (year, month)
{
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
   }
  return weeks;
}

function isSelectable (year, month, day)
{
    return compareDates({year: year, month: month, day:day},
        {year: tooday.getFullYear(), month: tooday.getMonth(), day: tooday.getDate()}) >= 0 ? true : false;
}

// 4. ОТРИСОВКА И ОБРАБОТЧИКИ
function renderWeeks (year, month)
{
    let weeks = buildCalendarGrid(year, month);
    let container = document.getElementById ("day-select");
    container.replaceChildren();

    weeks.forEach((week) => {
        let daySelectRow = document.createElement("div");
        daySelectRow.className = "days-row";
        
        week.forEach((cell) => {
            let daySelectItem = document.createElement("span");
            daySelectItem.className = "day"
            if (cell.otherMonth || !isSelectable(year, month, cell.day))
                daySelectItem.classList.add("unavailable");
            else if (cell.day === selectedDay)
                daySelectItem.classList.add("selected");

            daySelectItem.dataset.day = String(cell.day);
            daySelectItem.innerText = `${cell.day}`;

            daySelectItem.addEventListener("click", (event) => {
                if (event.currentTarget.classList.contains("unavailable"))
                    return;
                
                renderDayInFooter(event);
                renderWeeks(year, month);
            });

            daySelectRow.append(daySelectItem);
        });

        container.append(daySelectRow);
    })
}

function renderTimeSelect (day)
{
    let container = document.getElementById ("time-select-list");
    container.replaceChildren();

    for (let i = 0; i < slots.length; i+=2)
    {
        let timeSelectRow = document.createElement("div");
        timeSelectRow.className = "time-select-row";

        let timeSelectItem1 = document.createElement("button");
        let time1 = document.createElement("div");
        time1.className = "time";
        time1.innerText = slots[i].time
        timeSelectItem1.classList.add("time-select-item");
        if (!slots[i].available)
        {
            timeSelectItem1.classList.add("unavailable");
            timeSelectItem1.disabled = true;
        }
        else if (slots[i].time === selectedTime)
            timeSelectItem1.classList.add("selected");
        timeSelectItem1.append(time1);
        timeSelectItem1.dataset.time = String(slots[i].time);
        timeSelectItem1.addEventListener("click", (event) => {   
            if (event.currentTarget.classList.contains("unavailable"))
                return;
            
            renderTimeInFooter(event);
            renderTimeSelect(selectedDay)
        })

        let timeSelectItem2 = document.createElement("button");
        let time2 = document.createElement("div");
        time2.className = "time";
        time2.innerText = slots[i+1].time
        timeSelectItem2.className = "time-select-item"
        if (!slots[i+1].available)
        {
            timeSelectItem2.classList.add("unavailable");
            timeSelectItem2.disabled = true;
        }
        else if (slots[i+1].time === selectedTime)
            timeSelectItem2.classList.add("selected");
        timeSelectItem2.append(time2);
        timeSelectItem2.dataset.time = String(slots[i+1].time);
        timeSelectItem2.addEventListener("click", (event) => {
            if (event.currentTarget.classList.contains("unavailable"))
                return;
            
            renderTimeInFooter(event);
            renderTimeSelect(selectedDay)
        })

        timeSelectRow.append(timeSelectItem1, timeSelectItem2);
    
        container.append(timeSelectRow);
    }
}

function renderTimeInFooter (event)
{
    let elem = document.getElementById("selected-time");  
    
    selectedTime = Number(event.currentTarget.dataset.time);  
    time = event.currentTarget.dataset.time;

    event.currentTarget.classList.add("selected");

    elem.innerText = `${time}:00`;
}

function renderDayInFooter(event)
{
    let elem = document.getElementById("selected-day");

    selectedDay = Number(event.currentTarget.dataset.day);
    day = event.currentTarget.dataset.day; 

    event.currentTarget.classList.add("selected");
    elem.innerText = `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${String(year)},`;
}

function renderCalebdarLabel ()
{
    let calendarLabel = document.getElementById("calendar-label");
    calendarLabel.innerText = `${getMonthName(month)} ${year}`;
}

function nextMonth ()
{
    selectedDay = null;
    selectedTime = null;
    let selectedDayElement = document.getElementById("selected-day");
    selectedDayElement.innerText = "";
    let selectedTimeElement = document.getElementById("selected-time");
    selectedTimeElement.innerText = "";

    if (month + 1 > 11)
    {
        month = 0;
        year += 1;
    }
    else
        month += 1;

    renderCalebdarLabel();
    renderWeeks(year, month);
    renderTimeSelect(selectedDay);
}

function prevMonth ()
{
    selectedDay = null;
    selectedTime = null;
    let selectedDayElement = document.getElementById("selected-day");
    selectedDayElement.innerText = "";
    let selectedTimeElement = document.getElementById("selected-time");
    selectedTimeElement.innerText = "";

    if (month - 1 < 0)
    {
        month = 11;
        year -= 1;
    }
    else
        month -= 1;

    renderCalebdarLabel();
    renderWeeks(year, month);
    renderTimeSelect(selectedDay);
}

// 5. ИНИЦИЛИЗАЦИЯ
function init()
{
    let netxBtn = document.getElementById("next-month-btn");
    let prevBtn = document.getElementById("prev-month-btn");

    netxBtn.addEventListener("click", () => {
        nextMonth()
    })
    prevBtn.addEventListener("click", () => {
        prevMonth()
    })

    renderCalebdarLabel();
    renderWeeks(year, month)
    renderTimeSelect (selectedDay);
}



init();