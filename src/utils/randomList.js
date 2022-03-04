export const randomSubList = (size, source) => {
	const visited = {};
	const result = [];
	while (size > 0) {
		const randomIndex = Math.round(Math.random() * (source.length - 1));
		if (!visited[randomIndex]) {
			size--;
			result.push(source[randomIndex]);
			visited[randomIndex] = true;
		}
	}

	return result;
};
