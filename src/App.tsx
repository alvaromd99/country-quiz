import './App.css'
import GlobeSvg from '../country-quiz-master/undraw_adventure_4hum 1.svg'
import WinSvg from '../country-quiz-master/undraw_winners_ao2o 2.svg'
import { useEffect, useState } from 'react'
import { Country, QuestionType, QuestionValues } from './types/types'
import { fetchCountries, getRandomUniqueIndexes } from './services'
import Question from './components/Question'
import Footer from './components/Footer'
import Switch from './components/Switch'
import NextBtn from './components/NextBtn'

// TODO Add a correct answer counter

function App() {
	const [countries, setCountries] = useState<Country[]>([])
	const [isDataFetched, setIsDataFetched] = useState<boolean>(false)
	const [isNeedNewData, setIsNeedNewData] = useState<boolean>(false)
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
	const [questionType, setQuestionType] = useState<QuestionType>('capital')
	const [correctCounter, setCorrectCounter] = useState<number>(4)
	const [questionValues, setQuestionValues] = useState<QuestionValues>({
		name: '',
		capital: '',
		flag: '',
		wrongAnswers: [],
	})

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

	const resetGame = () => {
		setIsNeedNewData(true)
		setIsAnswerCorrect(false)
		if (questionType === 'capital') setQuestionType('flag')
		if (questionType === 'flag') setQuestionType('capital')
		if (correctCounter >= 3) {
			setCorrectCounter(0)
		}
	}

	return (
		<div className='App'>
			<h1>COUNTRY QUIZ</h1>
			{correctCounter < 3 && (
				<img className='globe' src={GlobeSvg} alt='Person and globe svg' />
			)}
			<div className='quiz-cont'>
				{correctCounter < 3 && (
					<Question
						values={questionValues}
						setIsAnswerCorrect={handleAnswerCorrect}
						questionType={questionType}
						correctCounter={correctCounter}
						setCorrectCounter={setCorrectCounter}
					/>
				)}
				{correctCounter >= 3 && (
					<div className='winner-page'>
						<img
							className='win-svg'
							src={WinSvg}
							alt='Two persons celebrating svg'
						/>
						<div className='info-results'>
							<h2>Results</h2>
							<p>
								You got <span className='big-number'>{correctCounter}</span>{' '}
								answers correct.
							</p>
						</div>
						<NextBtn
							text={'Try Again'}
							btnClass={'again-btn'}
							resetGame={resetGame}
						/>
					</div>
				)}

				{isAnswerCorrect && (
					<NextBtn text={'Next'} btnClass={'next-btn'} resetGame={resetGame} />
				)}
			</div>
			<Switch />
			<Footer />
		</div>
	)
}

export default App
