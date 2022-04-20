(function () {
	document.querySelectorAll('.marchingAnts').forEach(animateLine)

	function animateLine({ style }) {
		const SPEED = 0.2
		let offset = 0
		style.strokeDasharray = '6 2'
		requestAnimationFrame(function anim() {
			offset -= SPEED // The `offset` "extra" variable is for FF and Safari
			style.strokeDashoffset = offset
			requestAnimationFrame(anim)
		})
	}
}())
