import { days, interactionsCategories, months } from '../config.js';
import { getState } from '../patterns/state.js';
import formatDate from '../utils/format-date.js';
const mainContainer = document.querySelector('.main-container');

let appStateJoined;
const matchEventsWithCalendar = ({ month, year }, dayList) => {
	appStateJoined = [].concat(...Object.values(getState() || []));
	const cellDays = dayList.querySelectorAll('li');
	const dateRegex = /^(\w+), (\w+) (\d+),/;

	const appStateCopy = appStateJoined
		.map(item => {
			const copy = { ...item };
			copy.date = dateRegex.exec(formatDate(item.date));
			return copy;
		})
		.filter(item => item.date[2] === month);

	for (const day of cellDays) {
		const dayNumber = day.textContent;

		if (dayNumber !== '' && year === new Date().getFullYear()) {
			appStateCopy.forEach(event => {
				if (event.date[3] === dayNumber) {
					const eventColor =
						event.interaction === interactionsCategories.favorites
							? 'pink'
							: event.interaction === interactionsCategories.interested
							? 'yellow'
							: 'green';

					const eventDay = document.createElement('button');
					eventDay.setAttribute('data-id', event.id);
					eventDay.setAttribute('data-interaction', event.interaction);

					eventDay.className = `event-btn calendar__event-btn calendar__event-${eventColor}`;
					eventDay.innerHTML = `<span class="event-btn calendar__event-text" data-id="${event.id}" data-interaction="${event.interaction}">${event.title}</span>`;

					day.appendChild(eventDay);
				}
			});
		}
	}
};

const generateMonthDays = ({ year, month }) => {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const today = new Date();

	const daysList = document.createElement('ul');
	daysList.className = 'calendar__list';

	let date = 1;
	for (let i = 0; i < days.length - 1; i++) {
		for (let j = 0; j < days.length; j++) {
			const dayCell = document.createElement('li');
			dayCell.className = 'calendar__day';

			if (i === 0 && j < firstDay.getDay()) {
				daysList.appendChild(dayCell);
			} else if (date > lastDay.getDate()) {
				dayCell.innerHTML = '';
				daysList.appendChild(dayCell);
			} else {
				dayCell.innerHTML = date;
				daysList.appendChild(dayCell);

				if (
					date === today.getDate() &&
					year === today.getFullYear() &&
					month === today.getMonth()
				) {
					dayCell.classList.add('current-day');
				}
				date++;
			}
		}
	}
	matchEventsWithCalendar({ month: months[month], year }, daysList);

	return daysList.outerHTML;
};

function renderCalendar({ year, month }) {
	const templateCalendar = `
    <div id="calendar-month" class="calendar__month">
      <button id="prev-month" class="calendar__prev-month calendar__month-btn"></button>
      <h2 class="calendar__month-title">${months[month]} ${year}</h2>
      <button id="next-month" class="calendar__next-month calendar__month-btn"></button>
    </div>
  `;

	const daysContainer = document.createElement('ul');
	daysContainer.className = 'calendar__list calendar__days-container';
	daysContainer.innerHTML = days
		.map(({ label }) => `<li>${label}</li>`)
		.join('');

	const calendarContainer = `
    <div id="calendar" class="container">
      ${templateCalendar}
      ${daysContainer.outerHTML}
      ${generateMonthDays({ year, month })}
    </div>
  `;

	mainContainer.innerHTML = calendarContainer;
}

function renderEventModal({ eventData }) {
	const {
		image,
		title,
		price,
		date,
		location: { address, city, state },
	} = eventData;
	document.body.style.overflow = 'hidden';

	const eventPrice = Number(price) !== 0 ? `$${price.toFixed(2)}` : 'Free';
	const eventModal = document.createElement('div');
	eventModal.className = 'event-modal';

	eventModal.innerHTML = `
    <div class="event-modal__card ">
      <img src="${image}" alt="${title}"/> 
      <div class="event-modal__text">
        <h3>${title}</h3>
        <p class="date">${formatDate(new Date(date))}.</p>
        <p>${address} • ${city}, ${state}.</p>
        <strong>${eventPrice}</strong>
      </div>
    </div>
  `;

	mainContainer.appendChild(eventModal);
}

const currentDate = new Date();
function handleCalendarButtons(e) {
	const target = e.target;
	if (
		!target.matches('button') &&
		!target.matches('.event-btn') &&
		!target.matches('.event-modal')
	)
		return;

	if (target.matches('#prev-month')) {
		const currentMonth = currentDate.getMonth();
		currentDate.setMonth(currentMonth - 1);

		renderCalendar({
			month: currentDate.getMonth(),
			year: currentDate.getFullYear(),
		});
	}

	if (target.matches('#next-month')) {
		const currentMonth = currentDate.getMonth();
		currentDate.setMonth(currentMonth + 1);

		renderCalendar({
			month: currentDate.getMonth(),
			year: currentDate.getFullYear(),
		});
	}

	if (target.matches('.event-btn')) {
		const eventData = appStateJoined.find(
			item =>
				item.id === target.dataset.id &&
				item.interaction === target.dataset.interaction,
		);
		renderEventModal({ eventData });
	}

	if (target.matches('.event-modal')) {
		document.body.style.overflow = 'auto';
		mainContainer.removeChild(document.querySelector('.event-modal'));
	}
}

function intitCalendar() {
	mainContainer.addEventListener('click', handleCalendarButtons);
	renderCalendar({
		month: currentDate.getMonth(),
		year: currentDate.getFullYear(),
	});
}

export default intitCalendar;
