import { getRandomUniqueIndexes } from '.'
import { Country, QuestionValues } from '../types/types'

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
