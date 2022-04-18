window.addEventListener('load', function () {
	document.querySelectorAll('.marchingAnts').forEach(animateLine)

	function animateLine(elem) {
		const SPEED = 0.2
		let offset = 0
		elem.style.strokeDasharray = '6 2'
		requestAnimationFrame(function anim() {
			offset -= SPEED // Without this extra variable, it doesn't work in FF and Safari
			elem.style.strokeDashoffset = offset
			requestAnimationFrame(anim)
		})
	}
})
