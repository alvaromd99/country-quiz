export const reArrangeArray = (array: string[]) => {
	// Función de comparación aleatoria
	const randomComparator = () => Math.random() - 0.5

	// Utiliza la función de comparación para ordenar el array aleatoriamente
	const shuffledArray = [...array].sort(randomComparator)

	return shuffledArray
}
