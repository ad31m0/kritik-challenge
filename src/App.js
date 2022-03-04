import React, {useState, useEffect} from 'react';
import {useLocalStorage} from './utils/useLocalStorage.js';
import {randomSubList} from './utils/randomList.js';
import {get} from './utils/http.js';
import {getMutualNeighbors, createCountriesMap} from './utils/countries.js';

import './App.css';

const ALL_COUNTRIES_URL = 'https://travelbriefing.org/countries.json';
const SIZE = 10;

function App() {
	const [mutualNeighbors, setMutualNeighbors] = useState(null);
	const [countriesSubList, setCountriesSubList] = useState([]);
	const [countriesMap, setCountriesMap] = useState({});
	const [allCountries, setAllCountries] = useLocalStorage('allCountries', null);

	if (!allCountries) {
		setAllCountries(get(ALL_COUNTRIES_URL).map((c, id) => ({...c, id})));
	}

	if (allCountries && countriesSubList.length === 0) {
		const sublist = randomSubList(SIZE, allCountries);
		sublist.sort((a, b) => (a.id < b.id ? -1 : 1));
		setCountriesSubList(sublist);
	}

	useEffect(() => {
		if (Object.keys(countriesMap).length > 0) return;
		setCountriesMap(createCountriesMap(countriesSubList));
	}, [countriesMap, countriesSubList]);

	useEffect(() => {
		if (mutualNeighbors) return;
		if (Object.keys(countriesMap).length !== SIZE) return;
		const neighbors = getMutualNeighbors(countriesMap);
		setMutualNeighbors(neighbors);
	}, [mutualNeighbors, countriesMap]);
	return (
		<div className="App">
			<h3>
				<u>
					{mutualNeighbors
						? mutualNeighbors.length > 0
							? 'Multiple mutual neighbors found'
							: 'No mutual neighbours found'
						: 'Loading'}
				</u>
			</h3>
			<p>
				<button
					onClick={() => {
						setCountriesSubList([]);
						setCountriesMap({});
						setMutualNeighbors(null);
					}}
				>
					Generate Groupings
				</button>
			</p>

			<h3>Selected Countries</h3>
			<ul>
				{countriesSubList.map((country) => (
					<li key={`country-${country.id}`}>{country.name}</li>
				))}
			</ul>

			<h3>Neighbors</h3>
			<ul>
				{mutualNeighbors ? (
					mutualNeighbors.length > 0 ? (
						mutualNeighbors.map((country) => (
							<li key={`mutual-country-${country.id}`}>{country.name}</li>
						))
					) : (
						<span> No groupings found.</span>
					)
				) : (
					<span>Loading</span>
				)}
			</ul>
		</div>
	);
}

export default App;
