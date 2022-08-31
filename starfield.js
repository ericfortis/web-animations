// Based on Coding Math 
// @bit101
// https://www.youtube.com/watch?v=OuzWDQ6zFXo

Starfield(document.getElementById('Starfield'))

function Starfield(target) {
	if (!window.requestAnimationFrame)
		return

	const colors = ['#aaa', '#eee', '#fffbce']
	const maxSize = 1.5
	
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')
	canvas.style.background = getComputedStyle(target).background
	target.insertAdjacentElement('beforebegin', canvas)
	target.style.background = 'none'
	
	let stars = []
	let raf, maxX, maxY

	init()
	window.addEventListener('resize', init)

	function init() {
		cancelAnimationFrame(raf)
		const nStars = window.innerWidth * 0.2 | 0
		maxX = target.offsetWidth
		maxY = target.offsetHeight
		canvas.width = maxX
		canvas.height = maxY
		stars = []

		for (let i = 0; i < nStars; i++)
			stars.push({
				x: Math.random() * maxX,
				y: Math.random() * maxY,
				vx: Math.random() * 0.2, // velocity
				vy: Math.random() * -0.2,
				size: Math.random() * maxSize,
				dsize: Math.random() * 0.03, // delta size
				color: colors[i % colors.length]
			})
		render()
	}

	function render() {
		context.clearRect(0, 0, maxX, maxY)
		context.globalAlpha = 0.8

		for (const star of stars) {
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
			context.arc(star.x, star.y, star.size, 0, Math.PI * 2)
			context.fillStyle = star.color
			context.fill()
		}

		raf = requestAnimationFrame(render)
	}
}
