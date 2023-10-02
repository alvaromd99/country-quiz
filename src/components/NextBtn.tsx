interface NextBtnProps {
	text: string
	btnClass: string
	resetGame(): void
}
export default function NextBtn({ text, btnClass, resetGame }: NextBtnProps) {
	return (
		<button
			className={btnClass}
			onClick={() => {
				resetGame()
			}}>
			{text}
		</button>
	)
}
