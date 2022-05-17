// Based on Coding Math 
// @bit101
// https://www.youtube.com/watch?v=OuzWDQ6zFXo

Starfield(document.getElementById('Starfield'))

function Starfield(target) {
	if (!window.requestAnimationFrame)
		return

	var nStars = window.innerWidth / 5
	var stars = []
	var colors = ['#aaa', '#eee', '#fffbce']

	var raf
	var maxX, maxY
	var maxSize = 1.5

	var TAO = Math.PI * 2

	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')

	canvas.style.position = 'absolute'
	canvas.style.background = getComputedStyle(target).background

	target.insertAdjacentElement('beforebegin', canvas)
	target.style.background = 'none'


	init()
	window.addEventListener('resize', init)

	function init() {
		cancelAnimationFrame(raf)
		maxX = canvas.width = target.offsetWidth
		maxY = canvas.height = target.offsetHeight
		stars = []

		for (var i = 0; i < nStars; i++)
			stars.push({
				x: Math.random() * maxX,
				y: Math.random() * maxY,
				vx: Math.random() / 2, // velocity
				vy: Math.random() * -0.2,
				size: Math.random() * maxSize,
				dsize: Math.random() * 0.03, // delta size
				color: colors[i % colors.length]
			})
		render()
	}

	function render() {
		context.clearRect(0, 0, maxX, maxY)

		for (var i = 0; i < nStars; i++) {
			var star = stars[i]
			star.x += star.vx
			star.y += star.vy
			star.size += star.dsize

			if (star.x > maxX)
				star.x = 0
			else if (star.x < 0)
				star.x = maxX

			if (star.y > maxY)
				star.y = 0
			else if (star.y < 0)
				star.y = maxY

			if (star.size > maxSize || star.size < 0) {
				star.dsize *= -1
				star.size = Math.abs(star.size)
			}

			context.beginPath()
			context.arc(star.x, star.y, star.size, 0, TAO)
			context.fillStyle = star.color
			context.fill()
		}

		raf = requestAnimationFrame(render)
	}
}
