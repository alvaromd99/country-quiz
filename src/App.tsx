import './App.css'
import GlobeSvg from '../country-quiz-master/undraw_adventure_4hum 1.svg'
import { useEffect, useState } from 'react'
import { Country, QuestionValues } from './types/types'
import CapitalQuestion from './components/CapitalQuestion'

// API CALL -> https://restcountries.com/v3.1/all?fields=name,capital,flag

function App() {
	const [countries, setCountries] = useState<Country[]>([])
	const [isDataFetched, setIsDataFetched] = useState<boolean>(false)
	const [isNeedNewData, setIsNeedNewData] = useState<boolean>(false)
	const [questionValues, setQuestionValues] = useState<QuestionValues>({
		name: '',
		capital: '',
		flag: '',
		wrongAnswers: [],
	})

	useEffect(() => {
		if (!isDataFetched) {
			fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag')
				.then((res) => {
					if (!res.ok) {
						throw new Error('Failed to fetch countries')
					}
					return res.json()
				})
				.then((data) => {
					setCountries(data)
					setIsDataFetched(true)
				})
				.catch((err) => console.error('Something went wrong -> ' + err))
		}
	}, [isDataFetched])

	useEffect(() => {
		if (countries.length > 0) {
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
		setIsNeedNewData(false)
	}, [countries, isNeedNewData])

	function getRandomUniqueIndexes(count: number, max: number) {
		const indexes: number[] = []

		while (indexes.length < count) {
			const randomIndex = Math.floor(Math.random() * max)
			if (!indexes.includes(randomIndex)) {
				indexes.push(randomIndex)
			}
		}
		return indexes
	}

	console.log(countries)
	console.log(questionValues)

	return (
		<div className='App'>
			<h1>COUNTRY QUIZ</h1>
			<img className='globe' src={GlobeSvg} alt='Person and globe svg' />
			<div className='quiz-cont'>
				<CapitalQuestion values={questionValues} />
			</div>
		</div>
	)
}

export default App
