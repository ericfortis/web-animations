window.addEventListener('load', function () {
	const Search = document.getElementById('Search')
	const glass = Search.querySelector('.MagnifierGlass')

	const duration = 280

	AnimateSearch()
	function AnimateSearch() {
		Search.removeEventListener('click', AnimateSearch)
		let delay = 0
		animateGlassPosition(0, 0, 60, 0, delay)

		delay += duration
		animateGlassPosition(60, 0, 0, 25, delay)

		delay += duration
		animateGlassPosition(0, 25, 60, 25, delay)

		delay += duration
		animateGlassPosition(60, 25, 0, 50, delay)

		delay += duration
		animateGlassPosition(0, 50, 42, 50, delay)

		delay += duration + 800
		animateGlassPosition(42, 50, 0, 0, delay)

		setTimeout(function throttle() {
			Search.addEventListener('click', AnimateSearch)
		}, delay + duration)
	}

	function animateGlassPosition(x0, y0, x1, y1, delayMs) {
		setTimeout(() => animateXY(x0, y0, x1, y1), delayMs)
	}

	function animateXY(x0, y0, x1, y1) {
		const elem = glass
		animate()
		function animate() {
			const start = Date.now()
			requestAnimationFrame(function anim() {
				const time = Math.min(1, (Date.now() - start) / duration)
				const positionX = easeOutQuad(time) * (x1 - x0) + x0
				const positionY = easeOutQuad(time) * (y1 - y0) + y0
				elem.setAttribute('transform', `translate(${positionX}, ${positionY})`)
				if (time < 1)
					requestAnimationFrame(anim)
			})
		}
	}

	function easeOutQuad(x) { // https://easings.net/#easeOutQuad
		return x * (2 - x)
	}
})
