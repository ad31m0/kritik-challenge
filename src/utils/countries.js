import {get} from './http.js';

export const getMutualNeighbors = (countriesMap) => {
	const valid = {};

	for (const countryName of Object.keys(countriesMap)) {
		const neighbors = countriesMap[countryName].neighbors;
		for (const neighbor of neighbors) {
			if (countriesMap[neighbor.name]) {
				valid[neighbor.name] = true;
				valid[countryName] = true;
			}
		}
	}

	const neighbors = [];
	for (const countryName of Object.keys(countriesMap)) {
		if (valid[countryName]) {
			neighbors.push(countriesMap[countryName]);
		}
	}

	neighbors.sort((a, b) => (a.id < b.id ? -1 : 0));
	return neighbors;
};

export const createCountriesMap = (countriesSubList) => {
	const countriesMap = {};
	for (const country of countriesSubList) {
		if (countriesMap[country.name]) return;
		countriesMap[country.name] = {
			id: country.id,
			name: country.name,
			neighbors: get(country.url).neighbors,
		};
	}

	return countriesMap;
};
