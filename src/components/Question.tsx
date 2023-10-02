import '../styles/Questions.css'
import { QuestionValues } from '../types/types'
import { reArrangeArray } from '../services/shuffleArray'
import { useEffect, useState } from 'react'
import Answer from './Answer'

interface CapitalQuestionProps {
	values: QuestionValues
	setIsAnswerCorrect: (correct: boolean) => void
	questionType: string
	correctCounter: number
	setCorrectCounter: (correctCounter: number) => void
}

export default function Question({
	values,
	setIsAnswerCorrect,
	questionType,
	correctCounter,
	setCorrectCounter,
}: CapitalQuestionProps) {
	const { capital, flag, name, wrongAnswers } = values
	const [shuffledArray, setShuffledArray] = useState<string[]>([])
	const [answer, setAnswer] = useState<string | null>(null)

	useEffect(() => {
		const names: string[] = [...wrongAnswers, name]
		const shuffleArr: string[] = reArrangeArray(names)
		setShuffledArray(shuffleArr)
	}, [name, wrongAnswers])

	const handleClick = (selectedAnswer: string) => {
		setAnswer(selectedAnswer)

		if (selectedAnswer === name) {
			setIsAnswerCorrect(true)
			setCorrectCounter(correctCounter + 1)
		} else {
			setCorrectCounter(0)
		}
		console.log('Contador' + correctCounter)
	}

	return (
		<div className='questions-cont'>
			{questionType === 'flag' && (
				<>
					<span className='flag'>{flag}</span>
					<h2>Which country does this flag belongs to</h2>
				</>
			)}
			{questionType === 'capital' && <h2>{capital} is the capital of</h2>}

			<div className='answers-cont'>
				{shuffledArray.map((option, index) => {
					return (
						<Answer
							option={option}
							answer={answer}
							name={name}
							index={index}
							handleClick={handleClick}
						/>
					)
				})}
			</div>
		</div>
	)
}
