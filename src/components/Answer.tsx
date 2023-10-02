import correctIcon from '../assets/correctIcon.svg'
import incorrectIcon from '../assets/incorrectIcon.svg'

interface AnswerProps {
	option: string
	answer: string | null
	name: string
	index: number
	handleClick: (option: string) => void
}

export default function Answer({
	option,
	answer,
	name,
	index,
	handleClick,
}: AnswerProps) {
	const isSelected = option === answer
	const isCorrect = isSelected && option === name
	const imgSrc = isCorrect ? correctIcon : incorrectIcon
	const btnClass = `question ${
		isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''
	}`

	return (
		<button className={btnClass} onClick={() => handleClick(option)}>
			<div className='btn-text'>
				<p>{String.fromCharCode(65 + index)}</p>
				<p>{option}</p>
			</div>
			<img className='icon' src={imgSrc} alt='Correct icon' />
		</button>
	)
}
