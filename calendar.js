window.addEventListener('load', AnimateCalendar)

function AnimateCalendar() {
	const Calendar = document.getElementById('CalendarWrap')
	Calendar.removeEventListener('click', AnimateCalendar)

	setTimeout(function throttleClick() {
		Calendar.addEventListener('click', AnimateCalendar)
	}, 1000)

	Calendar.innerHTML = ''

	const frag = document.createDocumentFragment()
	for (let i = 0; i < (7 * 7); i++) {
		const day = document.createElement('div')
		if (i < 4 || i > 23 + (7 * 3))
			day.className = 'Day Spacer'
		else if (i < 25)
			day.className = 'Day Off'
		else
			day.className = 'Day On'
		frag.appendChild(day)
	}

	Calendar.appendChild(frag)
	
	document.querySelectorAll('.Day.Off').forEach((day, i) => {
		day.style.animationDelay = i * 30 + 'ms'
	})
	Array.from(document.querySelectorAll('.Day.On')).reverse().forEach((day, i) => {
		day.style.animationDelay = i * 30 + 'ms'
	})
}
