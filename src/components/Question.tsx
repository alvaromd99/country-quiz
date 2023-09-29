import '../styles/Questions.css'
import { QuestionValues } from '../types/types'
import { reArrangeArray } from '../services/shuffleArray'
import { useEffect, useState } from 'react'
import correctIcon from '../assets/correctIcon.svg'
import incorrectIcon from '../assets/incorrectIcon.svg'

interface CapitalQuestionProps {
	values: QuestionValues
	setIsAnswerCorrect: (correct: boolean) => void
	questionType: string
}

export default function Question({
	values,
	setIsAnswerCorrect,
	questionType,
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
		}
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
					const isSelected = option === answer
					const isCorrect = isSelected && option === name
					const imgSrc = isCorrect ? correctIcon : incorrectIcon
					const btnClass = `question ${
						isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''
					}`
					return (
						<button
							key={index}
							className={btnClass}
							onClick={() => handleClick(option)}>
							<div className='btn-text'>
								<p>{String.fromCharCode(65 + index)}</p>
								<p>{option}</p>
							</div>
							<img className='icon' src={imgSrc} alt='Correct icon' />
						</button>
					)
				})}
			</div>
		</div>
	)
}
