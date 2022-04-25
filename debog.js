window.addEventListener('load', AnimateDebog)

function AnimateDebog() {
	const Debog = byId('Debog')
	Debog.removeEventListener('click', AnimateDebog)

	const WingL = byId('WingL')
	const WingR = byId('WingR')
	const Mouth = byId('Mouth')
	const Nose = byId('Nose')
	const Legs = byId('Legs')

	const Letters = Array.from(document.querySelectorAll('.Letters path'))
	const all = [WingL, WingR, Mouth, Nose, Legs].concat(Letters)

	all.forEach(elem => elem.style.opacity = 0)

	animateRotation(WingL, -360, 360 * 4, 2000)
	animateRotation(WingR, 0, 360 * 6, 2200)
	animateStroke(Mouth, 2300)
	animateStroke(Nose, 2300)

	setTimeout(function () {
		animatePositionY(Legs, -50, 0, 180)
	}, 1900)

	document.querySelectorAll('.Letters path').forEach(function (elem, i) {
		setTimeout(function () {
			animatePositionY(elem, -80, 0, 120)
		}, 100 * i + 1600)
	})

	setTimeout(function ThrottleClick() {
		Debog.addEventListener('click', AnimateDebog)
	}, 2200)

	function animateRotation(elem, minAngle, maxAngle, duration) {
		const start = Date.now()
		elem.style.opacity = 1
		requestAnimationFrame(function anim() {
			const normTime = (Date.now() - start) / duration
			const angle = easeOutQuad(normTime) * (maxAngle - minAngle) + minAngle
			elem.style.transform = `rotate(${angle}deg)`
			if (normTime < 1)
				requestAnimationFrame(anim)
		})
	}

	function animateStroke(elem, duration) {
		const length = elem.getTotalLength()
		const start = Date.now()
		elem.style.opacity = 1
		elem.style.strokeDasharray = length + ' ' + length
		elem.style.strokeDashoffset = length
		requestAnimationFrame(function anim() {
			const normTime = (Date.now() - start) / duration
			elem.style.strokeDashoffset = (+length * easeOutQuad(normTime)) + +length
			if (normTime < 1)
				requestAnimationFrame(anim)
		})
	}

	function animatePositionY(elem, minY, maxY, duration) {
		const start = Date.now()
		requestAnimationFrame(function anim() {
			const normTime = (Date.now() - start) / duration
			elem.style.opacity = normTime
			const y = easeOutQuad(normTime) * (maxY - minY) + minY
			elem.style.transform = `translate(0, ${y}px)`
			if (normTime < 1)
				requestAnimationFrame(anim)
		})
	}

	function byId(id) {
		return document.getElementById(id)
	}

	function easeOutQuad(x) { // https://easings.net/#easeOutQuad
		return x * (2 - x)
	}
}


