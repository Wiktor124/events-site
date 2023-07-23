let state;

const dynamic = {
	getData() {
		return { ...state };
	},
	setNewData(newState) {
		state = { events: newState };
	},
};
const { getData, setNewData } = Object.freeze(dynamic);

export { getData, setNewData };
