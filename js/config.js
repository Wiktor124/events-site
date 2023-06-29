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
};

const interactionsTabs = [
  {
    label: "Favorites",
    category: interactionsCategories.favorites
  },
  {
    label: "Interested",
    category: interactionsCategories.interested,
  },
  {
    label: "Going",
    category: interactionsCategories.going,
  }
];


const defaultFlag = false;
const interactionFlag = {
  heart: defaultFlag,
  interested: defaultFlag,
  going: defaultFlag
}

export { homeTabs, interactionsTabs, interactionsCategories };
