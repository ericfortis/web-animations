window.addEventListener('load', function () {
	const Fortress = document.getElementById('Fortress')
	const bottomDoor = Fortress.querySelector('.BottomDoor')
	const middleWindows = Fortress.querySelector('.MiddleWindows')
	const topLeftWindow = Fortress.querySelector('.TopLeftWindow')
	const topRightWindow = Fortress.querySelector('.TopRightWindow')

	const duration = 120
	const offDelay = 400

	animate()
	function animate() {
		Fortress.removeEventListener('click', animate)

		fadeIn(bottomDoor, 0)
		fadeIn(middleWindows, 1 * duration)
		fadeIn(topLeftWindow, 2 * duration)
		fadeIn(topRightWindow, 3 * duration)
		fadeOut(middleWindows, 4 * duration + offDelay)
		fadeOut(topLeftWindow, 5 * duration + offDelay)
		fadeOut(topRightWindow, 6 * duration + offDelay)
		fadeOut(bottomDoor, 7 * duration + offDelay)

		setTimeout(() => {
			Fortress.addEventListener('click', animate)
		}, 7 * duration + offDelay)
	}


	function fadeIn(element, delay) {
		setTimeout(function () {
			animateOpacity(element, 0, 1)
		}, delay)
	}

	function fadeOut(element, delay) {
		setTimeout(function () {
			animateOpacity(element, 1, 0)
		}, delay)
	}

	function animateOpacity(element, startOpacity, endOpacity) {
		const start = Date.now()
		requestAnimationFrame(function anim() {
			const normTime = (Date.now() - start) / duration
			const opacity = easeOutQuad(normTime) * (endOpacity - startOpacity) + startOpacity
			element.setAttribute('opacity', opacity)
			if (normTime < 1)
				requestAnimationFrame(anim)
		})
	}

	function easeOutQuad(x) { // https://easings.net/#easeOutQuad
		return x * (2 - x)
	}
})
