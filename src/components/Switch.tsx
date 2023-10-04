import '../styles/Switch.css'
import { SwitchValues } from '../types/types'
import hideIcon from '../assets/hideIcon.svg'
import showIcon from '../assets/showIcon.svg'
import { useState } from 'react'

interface SwitchProps {
	switchValues: SwitchValues
	setSwitchValues: (values: SwitchValues) => void
}

export default function Switch({ switchValues, setSwitchValues }: SwitchProps) {
	const [isVisible, setIsVisible] = useState(false)

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target

		const updatedSwitchValues = { ...switchValues, [name]: checked }

		// If both are unchecked doesn`t let you do it
		if (!updatedSwitchValues.capital && !updatedSwitchValues.flag) {
			return
		}
		setSwitchValues(updatedSwitchValues)
	}

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}

	const containerStyle = {
		top: isVisible ? '10px' : '-200px',
	}

	const btnStyle = {
		left: isVisible ? '226px' : '10px',
	}

	const imgSrc = isVisible ? hideIcon : showIcon

	return (
		<>
			<button className='menu-icon' style={btnStyle} onClick={toggleVisibility}>
				<img src={imgSrc} alt='show menu icon' />
			</button>
			<div className='switch-container' style={containerStyle}>
				<h2>Questions type</h2>
				<div className='label-container'>
					<label htmlFor='capital-btn' className='switch'>
						<input
							type='checkbox'
							id='capital-btn'
							name='capital'
							checked={switchValues.capital}
							onChange={handleCheckboxChange}
						/>
						<span className='slider'></span>
					</label>
					<p>Capital Questions</p>
				</div>
				<div className='label-container'>
					<label htmlFor='flag-btn' className='switch'>
						<input
							type='checkbox'
							id='flag-btn'
							name='flag'
							checked={switchValues.flag}
							onChange={handleCheckboxChange}
						/>
						<span className='slider'></span>
					</label>
					<p>Flag Questions</p>
				</div>
			</div>
		</>
	)
}
