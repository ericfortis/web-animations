window.addEventListener('load', function () {

	AnimateLock()
	function AnimateLock() {
		const Lock = document.getElementById('Padlock')
		Lock.removeEventListener('click', AnimateLock)

		const LockShape = Lock.getElementById('PadlockShape')

		let delay = 0
		let lastRotation = 0
		let duration = 400
		let rotation = 11

		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = -12
		delay += duration
		duration = 300
		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = 8
		delay += duration
		duration = 300
		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = -6
		delay += duration
		duration = 300
		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = 4
		delay += duration
		duration = 300
		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = -2
		delay += duration
		duration = 200
		rotateLock(lastRotation, rotation, duration, delay)

		lastRotation = rotation
		rotation = 0
		delay += duration
		duration = 200
		rotateLock(lastRotation, rotation, duration, delay)

		setTimeout(function throttle() {
			Lock.addEventListener('click', AnimateLock)
		}, duration + delay)

		function rotateLock(startRotation, endRotation, durationMs, delayMs) {
			setTimeout(() => animateRotation({
				element: LockShape,
				centerX: 75,
				centerY: 27,
				startRotation,
				endRotation,
				durationMs
			}), delayMs)
		}
	}

	function animateRotation(o) {
		animate()
		function animate() {
			const start = Date.now()
			requestAnimationFrame(function anim() {
				const time = Math.min(1, (Date.now() - start) / o.durationMs)
				const angle = easeOutQuad(time) * (o.endRotation - o.startRotation) + o.startRotation
				o.element.setAttribute('transform', `rotate( ${angle}, ${o.centerX}, ${o.centerY})`)
				if (time < 1)
					requestAnimationFrame(anim)
			})
		}
	}

	function easeOutQuad(x) { // https://easings.net/#easeOutQuad
		return x * (2 - x)
	}
})
