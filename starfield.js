
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

	// Array-like indices for V8's fast-properties optimization.
	var _X = 0
	var _Y = 1
	var _Size = 2
	var _Vx = 3
	var _Vy = 4
	var _Vsize = 5
	var _Color = 6

	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')

	canvas.style.position = 'absolute'
	canvas.style.background = getComputedStyle(target).background

	target.insertAdjacentElement('beforebegin', canvas)
	target.style.background = 'none'


	init()
	window.addEventListener('resize', init)

	function init() {
		cancelAnimationFrame(raf);
		maxX = canvas.width = target.offsetWidth
		maxY = canvas.height = target.offsetHeight

		for (var i = 0; i < nStars; i++)
			stars.push({
				[_X]: Math.random() * maxX,
				[_Y]: Math.random() * maxY,
				[_Size]: Math.random() * maxSize,
				[_Vx]: Math.random() / 2,
				[_Vy]: Math.random() * -0.2,
				[_Vsize]: Math.random() * 0.03,
				[_Color]: colors[i % colors.length]
			})
		render()
	}

	function render() {
		context.clearRect(0, 0, maxX, maxY)

		for (var i = 0; i < nStars; i++) {
			var star = stars[i]
			star[_X] += star[_Vx]
			star[_Y] += star[_Vy]
			star[_Size] += star[_Vsize]

			if (star[_X] > maxX)
				star[_X] = 0
			else if (star[_X] < 0)
				star[_X] = maxX

			if (star[_Y] > maxY)
				star[_Y] = 0
			else if (star[_Y] < 0)
				star[_Y] = maxY

			if (star[_Size] > maxSize || star[_Size] < 0) {
				star[_Vsize] *= -1
				star[_Size] = Math.abs(star[_Size])
			}

			context.beginPath()
			context.arc(star[_X], star[_Y], star[_Size], 0, TAO)
			context.fillStyle = star[_Color]
			context.fill()
		}

		raf = requestAnimationFrame(render)
	}
}
