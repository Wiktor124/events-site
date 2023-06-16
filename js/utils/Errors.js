const createErrors = (name) => {
  return class ErrorHandle extends Error {
    constructor(message) {  
      super(message);
      this.name = name;
    }
  };
}

const ConnectionError = createErrors('ConnectionError');

export { ConnectionError };