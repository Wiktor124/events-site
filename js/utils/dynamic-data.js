let state;

const dynamic = {
  getState() {
    return { ...state }
  },
  setState(newState) {
    state = { events: newState}
  }
}
Object.freeze(dynamic)

export default dynamic;
