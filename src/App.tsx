import './App.css'
import GlobeSvg from '../country-quiz-master/undraw_adventure_4hum 1.svg'
import { useEffect, useState } from 'react'
import { Country, QuestionValues } from './types/types'
import CapitalQuestion from './components/CapitalQuestion'
import { fetchCountries, getRandomUniqueIndexes } from './services'

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
			fetchCountries()
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
