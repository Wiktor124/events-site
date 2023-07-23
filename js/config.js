// These array are used to add categories to tabs

// Home
const homeTabs = [
	{
		label: 'Music',
		category: 'music',
	},
	{
		label: 'Sports',
		category: 'sports',
	},
	{
		label: 'Business',
		category: 'business',
	},
	{
		label: 'Food',
		category: 'food',
	},
	{
		label: 'Art',
		category: 'art',
	},
];

// Interactions
const interactionsCategories = {
	going: 'going',
	interested: 'interested',
	favorites: 'favorites',
	calendar: 'calendar',
	remove: 'remove',
};

const interactionsTabs = [
	{
		label: 'Favorites',
		category: interactionsCategories.favorites,
	},
	{
		label: 'Interested',
		category: interactionsCategories.interested,
	},
	{
		label: 'Going',
		category: interactionsCategories.going,
	},
	{
		label: 'Calendar',
		category: interactionsCategories.calendar,
	},
];

// Calendar
const days = Object.freeze([
	{
		label: 'Sunday',
		day: 'sunday',
	},
	{
		label: 'Monday',
		day: 'monday',
	},
	{
		label: 'Tuesday',
		day: 'tuesday',
	},
	{
		label: 'Wednesday',
		day: 'wednesday',
	},
	{
		label: 'Thursday',
		day: 'thursday',
	},
	{
		label: 'Friday',
		day: 'friday',
	},
	{
		label: 'Saturday',
		day: 'saturday',
	},
]);

const months = Object.freeze([
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]);

export { homeTabs, interactionsTabs, interactionsCategories, days, months };
