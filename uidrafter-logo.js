window.addEventListener('load', function () {
	const Logo = byId('UIDrafterLogo')

	const logoFrames = [ // SVG groups, each with the logo drawn in a different angle.
		byId('L00'),
		byId('L15'),
		byId('L30'),
		byId('L40')
	]
	const frameSequence = [1, 2, 3, 3, 2, 1, 0]
	const fps = 30
	const frameDuration = 1000 / fps

	spinLogo()
	function spinLogo() {
		Logo.removeEventListener('click', spinLogo)
		
		setTimeout(function () {
			logoFrames[0].style.filter = ''
		}, frameSequence.length * frameDuration)

		for (let i = 0; i < frameSequence.length; i++)
			setTimeout(render.bind(null, frameSequence[i]), i * frameDuration)

		setTimeout(function throttle() {
			Logo.addEventListener('click', spinLogo)
		}, frameSequence.length * frameDuration)

		function render(frame) {
			for (let i = 0; i < logoFrames.length; i++)
				logoFrames[i].style.opacity = 0
			logoFrames[frame].style.opacity = 1
			logoFrames[frame].style.filter = 'url(#hBlur)'
		}
	}

	function byId(qs) {
		return document.getElementById(qs)
	}
})
