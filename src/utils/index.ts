import { API_URL } from '../constants'
import { Country, QuestionValues } from '../types/types'

// * -----------------------------------------------------------------

export const fetchCountries = async () => {
	const response = await fetch(API_URL)
	if (!response.ok) {
		throw new Error('Failed to fetch countries')
	}
	const data = await response.json()
	return data
}

// * -----------------------------------------------------------------

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

// * -----------------------------------------------------------------

export const reArrangeArray = (array: string[]) => {
	// Función de comparación aleatoria
	const randomComparator = () => Math.random() - 0.5

	// Utiliza la función de comparación para ordenar el array aleatoriamente
	const shuffledArray = [...array].sort(randomComparator)

	console.log('Shuffle')

	return shuffledArray
}

// * -----------------------------------------------------------------

interface getValuesProps {
	countries: Country[]
	setQuestionValues: ({
		name,
		capital,
		flag,
		wrongAnswers,
	}: QuestionValues) => void
}

export const getValues = ({ countries, setQuestionValues }: getValuesProps) => {
	const randomIndexes = getRandomUniqueIndexes(4, countries.length)
	const randomCountries = randomIndexes.map((index) => countries[index])
	const [correctAnswer, ...wrongAnswers] = randomCountries

	setQuestionValues({
		name: correctAnswer.name.common,
		capital: correctAnswer.capital[0],
		flag: correctAnswer.flag,
		wrongAnswers: wrongAnswers.map((country) => country.name.common),
	})
}
