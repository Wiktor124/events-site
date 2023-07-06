// These array are used to add categories to tabs

// Home
const homeTabs = [
  {
    label: "Music",
    category: "music",
  },
  {
    label: "Sports",
    category: "sports",
  },
  {
    label: "Business",
    category: "business",
  },
  {
    label: "Food",
    category: "food",
  },
  {
    label: "Art",
    category: "art",
  },
];

// Interactions
const interactionsCategories = {
  going: "going",
  interested: "interested",
  favorites: "favorites",
  calendar: "calendar",
  remove: "remove"
};

const interactionsTabs = [
  // {
  //   label: "Favorites",
  //   category: interactionsCategories.favorites
  // },
  // {
  //   label: "Interested",
  //   category: interactionsCategories.interested,
  // },
  // {
  //   label: "Going",
  //   category: interactionsCategories.going,
  // },
  {
    label: "Calendar",
    category: interactionsCategories.calendar,
  }
];

// Calendar
const days = Object.freeze([
  {
    label: 'Sunday',
    day: 'sunday'
  },
  {
    label: 'Monday',
    day: 'monday'
  },
  {
    label: 'Tuesday',
    day: 'tuesday'
  },
  {
    label: 'Wednesday',
    day: 'wednesday'
  },
  {
    label: 'Thursday',
    day: 'thursday'
  },
  {
    label: 'Friday',
    day: 'friday'
  },
  {
    label: 'Saturday',
    day: 'saturday'
  }
]);

// const months = Object.freeze([
//   {
//     label: 'january',
//     month: 'January'
//   },
//   {
//     label: 'february',
//     month: 'February'
//   },
//   {
//     label: 'march',
//     month: 'March'
//   },
//   {
//     label: 'april',
//     month: 'April'
//   },
//   {
//     label: 'may',
//     month: 'May'
//   },
//   {
//     label: 'june',
//     month: 'June'
//   },
//   {
//     label: 'july',
//     month: 'July'
//   },
//   {
//     label: 'august',
//     month: 'August'
//   },
//   {
//     label: 'september',
//     month: 'September'
//   },
//   {
//     label: 'october',
//     month: 'October'
//   },
//   {
//     label: 'november',
//     month: 'November'
//   },
//   {
//     label: 'december',
//     month: 'December'
//   }
// ]);

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
  'December'
]);


export { homeTabs, interactionsTabs, interactionsCategories, days, months };