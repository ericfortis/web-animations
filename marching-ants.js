window.addEventListener('load', function () {
	const animatedLines = document.getElementsByClassName('marchingAnts')
	for (var i = 0; i < animatedLines.length; i++)
		animateLine(animatedLines[i])

	function animateLine(elem) {
		var SPEED = 0.2
		var offset = 0
		elem.style.strokeDasharray = '6 2'
		requestAnimationFrame(function anim() {
			offset -= SPEED // Without this extra variable, it doesn't work in FF and Safari
			elem.style.strokeDashoffset = offset
			requestAnimationFrame(anim)
		})
	}
})
