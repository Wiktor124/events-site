import { days, months } from "../config.js";
import appInteractions from "../patterns/singleton.js";
import formatDate from "../utils/format-date.js";

const mainContainer = document.querySelector('.main-container');
const daysNumber = [];
const matchEventsWithCalendar = ({ monthLength, month, year }) => {
  const regex = /^(\w+), (\w+) (\d+),/;

  const appStateJoined = [].concat(...Object.values(JSON.parse(localStorage.getItem('appState')) || []))
  
  for (let i = 0; i < appStateJoined.length; i++) {
    const [, eventDay, eventMonth, eventDayNumber ] = regex.exec(formatDate(appStateJoined[i].date));
    
    if(month === eventMonth && daysNumber.includes(Number(eventDayNumber))) {
      // const eventData = appStateJoined.find(item => item.)
      console.log(appStateJoined[i]);
    }
  }
}

const generateMonthDays = ({ year, month }) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  const daysList = document.createElement('ul')
  daysList.className = 'calendar__list'

  let date = 1;
  for (let i = 0; i < days.length - 1; i++) {

    for (let j = 0; j < days.length; j++) {
      const dayCell = document.createElement('li');
      dayCell.className = 'calendar__day'

      if (i === 0 && j < firstDay.getDay()) {
        daysList.appendChild(dayCell);
      } else if (date > lastDay.getDate()) {

        dayCell.innerHTML = '';
        daysList.appendChild(dayCell);
      } else {

        dayCell.innerHTML = date;
        daysList.appendChild(dayCell);

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          dayCell.classList.add("current-day");
        }
        
        daysNumber.push(date)
        date++;
      }
    }
  }

  matchEventsWithCalendar({ monthLength: lastDay.getDate(), month: months[month], year })
  return daysList.outerHTML;
}

function renderCalendar({ year, month }) {

  const templateCalendar = `
    <div id="calendar-month" class="calendar__month">
      <button id="prev-month" class="calendar__prev-month calendar__month-btn"></button>
      <h2 class="calendar__month-title">${months[month]} ${year}</h2>
      <button id="next-month" class="calendar__next-month calendar__month-btn"></button>
    </div>
  `;

  const daysContainer = document.createElement('ul');
  daysContainer.className = 'calendar__list'
  daysContainer.innerHTML = days.map(({ label }) => `<li>${label}</li>`).join('');

  const calendarContainer = `
    <div id="calendar" class="container">
      ${templateCalendar}
      ${daysContainer.outerHTML}
      ${generateMonthDays({ year, month })}
    </div>
  `;

  mainContainer.innerHTML = calendarContainer;
}

const currentDate = new Date();
function handleCalendarButtons(e) {
  const target = e.target;
  if (!target.matches('button')) return;

  if (target.matches('#prev-month')) {
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentMonth - 1);

    renderCalendar({ month: currentDate.getMonth(), year: currentDate.getFullYear() })
  }

  if (target.matches('#next-month')) {
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentMonth + 1);

    renderCalendar({ month: currentDate.getMonth(), year: currentDate.getFullYear() })
  }
}

function intitCalendar() {
  mainContainer.addEventListener('click', handleCalendarButtons);
  renderCalendar({ month: currentDate.getMonth(), year: currentDate.getFullYear() })
}

export default intitCalendar;