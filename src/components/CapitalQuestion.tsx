import '../styles/Questions.css'
import { QuestionValues } from '../types'

interface CapitalQuestionProps {
	values: QuestionValues
}

export default function CapitalQuestion({ values }: CapitalQuestionProps) {
	const names: string[] = [...values.wrongAnswers, values.name]

	const reArrangeArray = (array: string[]) => {
		// Función de comparación aleatoria
		const randomComparator = () => Math.random() - 0.5

		// Utiliza la función de comparación para ordenar el array aleatoriamente
		const shuffledArray = [...array].sort(randomComparator)

		return shuffledArray
	}

	const shuffledArray: string[] = reArrangeArray(names)

	return (
		<div className='question-cont'>
			<h2>{values.capital} is the capital of</h2>
			<div className='question one'>{shuffledArray[0]}</div>
			<div className='question second'>{shuffledArray[1]}</div>
			<div className='question third'>{shuffledArray[2]}</div>
			<div className='question fourth'>{shuffledArray[3]}</div>
		</div>
	)
}
