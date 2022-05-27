window.addEventListener('load', AnimateCalendar)

function AnimateCalendar() {
	const Calendar = document.getElementById('CalendarWrap')
	Calendar.removeEventListener('click', AnimateCalendar)

	setTimeout(function throttleClick() {
		Calendar.addEventListener('click', AnimateCalendar)
	}, 1000)

	Calendar.innerHTML = ''

	let nOff = 0
	const msSpeed = 30
	const nDays = (7 * 7 - 3)
	const frag = document.createDocumentFragment()
	for (let i = 0; i < nDays; i++) {
		const day = document.createElement('div')
		if (i < 4)
			day.className = 'Day Spacer'
		else if (i < 25) {
			day.className = 'Day Off'
			day.style.animationDelay = nOff++ * msSpeed + 'ms'
		}
		else {
			day.className = 'Day On'
			day.style.animationDelay = (nDays - i) * msSpeed + 'ms'
		}
		frag.appendChild(day)
	}

	Calendar.appendChild(frag)
}
