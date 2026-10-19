export function getMonthName (month)
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

export function compareDates (a, b)
{
    const d1 = new Date(a.year, a.month, a.day);
    const d2 = new Date(b.year, b.month, b.day);
    if (d1 < d2) return -1;
    if (d2 < d1) return 1;
    return 0;
}

export function buildCalendarGrid (year, month)
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

export function isSelectable (year, month, day, tooday)
{
    return compareDates({year: year, month: month, day:day},
        {year: tooday.getFullYear(), month: tooday.getMonth(), day: tooday.getDate()}) >= 0 ? true : false;
}

export function getDayName (day)
{
  let name = "";

  switch (day)
  {
      case 0: name = "Вс"; break;  
      case 1: name = "Пн"; break;
      case 2: name = "Вт"; break;
      case 3: name = "Ср"; break;
      case 4: name = "Чт"; break;
      case 5: name = "Пт"; break;
      case 6: name = "Сб"; break;
  }

  return name;
}