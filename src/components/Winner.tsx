import WinSvg from '../../country-quiz-master/undraw_winners_ao2o 2.svg'
import NextBtn from './NextBtn'
import '../styles/Winner.css'

interface WinnerProps {
	correctCounter: number
	resetGame: () => void
}

export default function Winner({ correctCounter, resetGame }: WinnerProps) {
	return (
		<div className='winner-page'>
			<img className='win-svg' src={WinSvg} alt='Two persons celebrating svg' />
			<div className='info-results'>
				<h2>Results</h2>
				<p>
					You got <span className='big-number'>{correctCounter}</span> answers
					correct.
				</p>
			</div>
			<NextBtn
				text={'Try Again'}
				btnClass={'again-btn'}
				resetGame={resetGame}
			/>
		</div>
	)
}
