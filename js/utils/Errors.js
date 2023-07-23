const createErrors = name => {
	return class ErrorHandle extends Error {
		constructor(message) {
			super(message);
			this.name = name;
		}

		renderMessage(message) {
			const errorContainer = document.querySelector('.error-container');
			const template = `
        <h2>Oops‼</h2>
        <span>${message}</span>
      `;

			errorContainer.innerHTML =
				errorContainer.matches('ul') || errorContainer.matches('ol')
					? `<li id="error">${template}</li>`
					: `<div id="error">${template}</div>`;
		}
	};
};

const ConnectionError = createErrors('ConnectionError');

export { ConnectionError };
