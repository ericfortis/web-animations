window.addEventListener('load', AnimateDebog)

function AnimateDebog() {
	const Debog = byId('Debog')
	Debog.removeEventListener('click', AnimateDebog);

	const WingL = byId('WingL')
	const WingR = byId('WingR');
	const Mouth = byId('Mouth');
	const Nose = byId('Nose');
	const Legs = byId('Legs')

	const Letters = Array.from(document.querySelectorAll('.Letters path'))
	const all = [WingL, WingR, Mouth, Nose, Legs].concat(Letters)

	all.forEach(elem => elem.style.opacity = 0)

	animateRotation(WingL, -360, 720 * 2, 2000)
	animateRotation(WingR, 0, 1080 * 2, 2200)
	animateStroke(Mouth, 2300)
	animateStroke(Nose, 2300)

	setTimeout(function () {
		animatePositionY(Legs, -50, 0, 220)
	}, 2000)

	document.querySelectorAll('.Letters path')
		.forEach(function (elem, i) {
			setTimeout(function () {
				animatePositionY(elem, -80, 0, 120)
			}, 100 * i + 1600)
		})

	setTimeout(function ThrottleClick() {
		Debog.addEventListener('click', AnimateDebog);
	}, 2200)

	function animateRotation(elem, minAngle, maxAngle, duration) {
		const { style } = elem
		const start = Date.now()
		style.opacity = 1
		requestAnimationFrame(anim)
		function anim() {
			var normalizedTime = animationPercentage(start, duration)
			var angle = easeOutQuad(normalizedTime) * (maxAngle - minAngle) + minAngle
			style.transform = `rotate(${angle}deg)`
			if (normalizedTime < 1)
				requestAnimationFrame(anim)
		}
	}

	function animateStroke(elem, duration) {
		const length = elem.getTotalLength()
		const start = Date.now()
		const { style } = elem
		style.opacity = 1
		style.strokeDasharray = length + ' ' + length
		style.strokeDashoffset = length
		requestAnimationFrame(anim)
		function anim() {
			const normalizedTime = animationPercentage(start, duration)
			style.strokeDashoffset = (+length * easeOutQuad(normalizedTime)) + +length
			if (normalizedTime < 1)
				requestAnimationFrame(anim)
		}
	}

	function animatePositionY(elem, minY, maxY, duration) {
		const { style } = elem
		const start = Date.now()
		requestAnimationFrame(anim)
		function anim() {
			const normalizedTime = animationPercentage(start, duration)
			style.opacity = normalizedTime
			const y = easeOutQuad(normalizedTime) * (maxY - minY) + minY
			style.transform = `translate(0, ${y}px)`
			if (normalizedTime < 1)
				requestAnimationFrame(anim)
		}
	}

	function byId(id) {
		return document.getElementById(id)
	}

	function animationPercentage(start, duration) {
		return Math.min(1, (Date.now() - start) / duration)
	}

	function easeOutQuad(x) { // https://easings.net/#easeOutQuad
		return x * (2 - x)
	}
}


