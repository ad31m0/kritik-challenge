export const get = (url) => {
	const request = new XMLHttpRequest();
	request.open('GET', url, false); // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
		return JSON.parse(request.responseText);
	}

	console.log(request);
	return null;
};
