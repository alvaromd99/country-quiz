import '../styles/Switch.css'

export default function Switch() {
	return (
		<div className='switch-container'>
			<h2>Questions type</h2>
			<div className='label-container'>
				<label htmlFor='capital-btn' className='switch'>
					<input type='checkbox' id='capital-btn' />
					<span className='slider'></span>
				</label>
				<p>Capital Questions</p>
			</div>
			<div className='label-container'>
				<label htmlFor='flag-btn' className='switch'>
					<input type='checkbox' id='flag-btn' />
					<span className='slider'></span>
				</label>
				<p>Flag Questions</p>
			</div>
		</div>
	)
}
