const formatDate = date => {
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	};

	return new Intl.DateTimeFormat('en-US', options)
		.format(date)
		.replace(/(\s+at\s+)/, ', ');
};
export default formatDate;
