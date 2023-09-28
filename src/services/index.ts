import { API_URL } from '../constants/url'

export const fetchCountries = async () => {
	const response = await fetch(API_URL)
	if (!response.ok) {
		throw new Error('Failed to fetch countries')
	}
	const data = await response.json()
	return data
}

export const getRandomUniqueIndexes = (count: number, max: number) => {
	const indexes: number[] = []

	while (indexes.length < count) {
		const randomIndex = Math.floor(Math.random() * max)
		if (!indexes.includes(randomIndex)) {
			indexes.push(randomIndex)
		}
	}
	return indexes
}
