import './App.css'
import GlobeSvg from '../country-quiz-master/undraw_adventure_4hum 1.svg'
import { useEffect, useState } from 'react'
import { Country, QuestionType, QuestionValues } from './types/types'
import { fetchCountries } from './utils'
import Question from './components/Question'
import Footer from './components/Footer'
import Switch from './components/Switch'
import NextBtn from './components/NextBtn'
import Winner from './components/Winner'
import { getValues } from './utils/index'
import { SCORE_TO_WIN_THE_GAME as winnerScore } from './constants'

function App() {
	const [countries, setCountries] = useState<Country[]>([])
	const [isDataFetched, setIsDataFetched] = useState<boolean>(false)
	const [isNeedNewData, setIsNeedNewData] = useState<boolean>(false)
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false)
	const [questionType, setQuestionType] = useState<QuestionType>('capital')
	const [correctCounter, setCorrectCounter] = useState<number>(1)
	const [questionValues, setQuestionValues] = useState<QuestionValues>({
		name: '',
		capital: '',
		flag: '',
		wrongAnswers: [],
	})

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
			getValues({ countries, setQuestionValues })
		}
		setIsNeedNewData(false)
	}, [countries, isNeedNewData])

	const resetGame = () => {
		const newQuestionType = questionType === 'capital' ? 'flag' : 'capital'
		setQuestionType(newQuestionType)
		setIsNeedNewData(true)
		setIsAnswerCorrect(false)

		if (correctCounter >= winnerScore) {
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
				// Questions
				{correctCounter < winnerScore && (
					<Question
						values={questionValues}
						setIsAnswerCorrect={handleAnswerCorrect}
						questionType={questionType}
						correctCounter={correctCounter}
						setCorrectCounter={setCorrectCounter}
					/>
				)}
				// Next btn on questions
				{isAnswerCorrect && correctCounter < winnerScore && (
					<NextBtn text={'Next'} btnClass={'next-btn'} resetGame={resetGame} />
				)}
				// Win
				{correctCounter >= winnerScore && (
					<Winner correctCounter={correctCounter} resetGame={resetGame} />
				)}
			</div>
			<Switch />
			<Footer />
		</div>
	)
}

export default App
