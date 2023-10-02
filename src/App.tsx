import './App.css'
import GlobeSvg from '../country-quiz-master/undraw_adventure_4hum 1.svg'
import { useEffect, useState } from 'react'
import {
	Country,
	QuestionType,
	QuestionValues,
	GlobalQuestionType,
} from './types/types'
import { fetchCountries, getRandomUniqueIndexes } from './services'
import Question from './components/Question'
import Footer from './components/Footer'

// TODO Add a correct answer counter

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
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
	const [questionType, setQuestionType] = useState<QuestionType>('capital')
	const [globalQuestionType, setGlobalQuestionType] =
		useState<GlobalQuestionType>(null)

	// Función para manejar la respuesta correcta
	const handleAnswerCorrect = () => {
		setIsAnswerCorrect(true)
	}

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

	return (
		<div className='App'>
			<h1>COUNTRY QUIZ</h1>
			<img className='globe' src={GlobeSvg} alt='Person and globe svg' />
			<div className='quiz-cont'>
				<Question
					values={questionValues}
					setIsAnswerCorrect={handleAnswerCorrect}
					questionType={questionType}
				/>

				{isAnswerCorrect && (
					<button
						className='next-btn'
						onClick={() => {
							setIsNeedNewData(true)
							setIsAnswerCorrect(false)
							if (questionType === 'capital') {
								setQuestionType('flag')
							}
							if (questionType === 'flag') {
								setQuestionType('capital')
							}
						}}>
						Next
					</button>
				)}
				<div className='switch-container'>
					<h2>Questions type</h2>
					<div className='label-container'>
						<label htmlFor='capital-btn' className='switch'>
							<input type='checkbox' id='capital-btn' />
							<span className='slider'></span>
						</label>
						<p>Capital Questions</p>
					</div>
					<div className='label-container'>
						<label htmlFor='flag-btn' className='switch'>
							<input type='checkbox' id='flag-btn' />
							<span className='slider'></span>
						</label>
						<p>Flag Questions</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default App
