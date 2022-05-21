// Based on:
// https://css-tricks.com/svg-shape-morphing-works/
// There's no need to have the same number of points

// For converting paths to polygons
// https://betravis.github.io/shape-tools/path-to-polygon/
(function () {
	svgMorph({
		parent: document.getElementById('PlayPauseButton'),
		viewBox: '0 0 24 24',
		startPolygons: ['6.5 19, 17.5 12, 17.5 12, 6.5 5'], // Play icon
		endPolygons: ['6 19, 10 19, 10 5, 6 5', '14 5, 14 19, 18 19, 18 5'], // Pause icon
		fill: '#ff4000',
		dur: '240ms'
	})

	function svgMorph({ parent, viewBox, startPolygons, endPolygons, fill, dur }) {
		// Ensure both states have the same number of polygons by appending the last one
		while (endPolygons.length > startPolygons.length) startPolygons.push(startPolygons.at(-1))
		while (endPolygons.length < startPolygons.length) endPolygons.push(endPolygons.at(-1))

		const startAnimations = []
		const endAnimations = []
		const SVG = createSvgElement('svg', { viewBox })

		for (let i = 0; i < startPolygons.length; i++) {
			const startPoints = startPolygons[i]
			const endPoints = endPolygons[i]

			const poly = createSvgElement('polygon', {
				fill,
				points: startPoints
			})
			const toEnd = createSvgElement('animate', {
				to: endPoints,
				dur,
				fill: 'freeze',
				begin: 'indefinite',
				attributeName: 'points'
			})
			const toStart = createSvgElement('animate', {
				to: startPoints,
				dur,
				fill: 'freeze',
				begin: 'indefinite',
				attributeName: 'points'
			})

			endAnimations.push(toEnd)
			startAnimations.push(toStart)
			poly.append(toEnd, toStart)
			SVG.append(poly)
		}

		let animationEnded = false
		parent.append(SVG)
		parent.addEventListener('click', function () {
			for (const anim of animationEnded ? startAnimations : endAnimations)
				anim.beginElement()
			animationEnded = !animationEnded
		})
	}

	function createSvgElement(tagName, props) {
		const elem = document.createElementNS('http://www.w3.org/2000/svg', tagName)
		for (const [key, value] of Object.entries(props))
			elem.setAttribute(key, value)
		return elem
	}
}())
