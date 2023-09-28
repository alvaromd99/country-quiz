import '../styles/Questions.css'
import { QuestionValues } from '../types/types'
import { reArrangeArray } from '../services/shuffleArray'

interface CapitalQuestionProps {
	values: QuestionValues
}

export default function CapitalQuestion({ values }: CapitalQuestionProps) {
	const names: string[] = [...values.wrongAnswers, values.name]

	const shuffledArray: string[] = reArrangeArray(names)

	return (
		<div className='questions-cont'>
			<h2>{values.capital} is the capital of</h2>
			<div className='answers-cont'>
				<div className='question one'>
					<p>A</p>
					<p>{shuffledArray[0]}</p>
				</div>
				<div className='question second'>
					<p>B</p>
					<p>{shuffledArray[1]}</p>
				</div>
				<div className='question third'>
					<p>C</p>
					<p>{shuffledArray[2]}</p>
				</div>
				<div className='question fourth'>
					<p>D</p>
					<p>{shuffledArray[3]}</p>
				</div>
			</div>
		</div>
	)
}
