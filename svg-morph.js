// Based on:
// https://css-tricks.com/svg-shape-morphing-works/

// For converting paths to polygons:
// https://betravis.github.io/shape-tools/path-to-polygon/

(function () {
	// For having the same number of points, the BUS icon was drawn starting
	// with the CAR icon and moving points (no adding, no removing)
	svgMorph({
		parent: document.getElementById('SvgMorphCarToBus'),
		viewBox: '0 0 24 24',
		shapeTagName: 'path',
		startShapes: ['M 18.92,6.01 C 18.72,5.42 18.16,5 17.5,5 H 6.5 C 5.84,5 5.29,5.42 5.08,6.01 L 3,12 v 8 c 0,0.55 0.45,1 1,1 h 1 c 0.55,0 1,-0.45 1,-1 v -1 h 12 v 1 c 0,0.55 0.45,1 1,1 h 1 c 0.55,0 1,-0.45 1,-1 V 12 Z M 7.5,16 C 6.67,16 6,15.33 6,14.5 6,13.67 6.67,13 7.5,13 8.33,13 9,13.67 9,14.5 9,15.33 8.33,16 7.5,16 Z m 9,0 C 15.67,16 15,15.33 15,14.5 15,13.67 15.67,13 16.5,13 17.33,13 18,13.67 18,14.5 18,15.33 17.33,16 16.5,16 Z M 5.81,10 6.85,7 h 10.29 l 1.04,3 z'], // car
		endShapes: ['m 20.9,4.8 c -0.2,-0.6 -0.75,-1 -1.42,-1 h -15 c -0.7,0 -1.21,0.42 -1.42,1.01 L 3,12 v 8 c 0,0.55 0.45,1 1,1 h 1 c 0.55,0 1,-0.45 1,-1 v -1 h 12 v 1 c 0,0.55 0.45,1 1,1 h 1 c 0.55,0 1,-0.45 1,-1 V 12 Z M 5.9,17.6 c -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5 0,0.83 -0.67,1.5 -1.5,1.5 z m 12.4,0.07 c -0.83,0 -1.5,-0.67 -1.5,-1.5 0,-0.83 0.67,-1.5 1.5,-1.5 0.83,0 1.5,0.67 1.5,1.5 0,0.83 -0.67,1.5 -1.5,1.5 z M 4.82,11.78 4.85,5.78 h 14.29 l 0.11,6 z'], // bus
		fill: '#ff4000',
		dur: '240ms'
	})

	// These polygons also have the same number points
	svgMorph({
		parent: document.getElementById('SvgMorphPlayToPause'),
		viewBox: '0 0 24 24',
		shapeTagName: 'polygon',
		startShapes: ['6.5 19, 17.5 12, 17.5 12, 6.5 5'], // Play icon
		endShapes: ['6 19, 10 19, 10 5, 6 5', '14 5, 14 19, 18 19, 18 5'], // Pause icon
		fill: '#ff4000',
		dur: '240ms'
	})

	function svgMorph({ parent, viewBox, shapeTagName, startShapes, endShapes, fill, dur }) {
		// Ensure both states have the same number of shapes by appending the last one
		while (endShapes.length > startShapes.length) startShapes.push(startShapes.at(-1))
		while (endShapes.length < startShapes.length) endShapes.push(endShapes.at(-1))

		const attributeName = { path: 'd', polygon: 'points' }[shapeTagName]

		const startAnimations = []
		const endAnimations = []
		const svg = createSvgElement('svg', { viewBox })

		for (let i = 0; i < startShapes.length; i++) {
			const startPoints = startShapes[i]
			const endPoints = endShapes[i]

			const poly = createSvgElement(shapeTagName, {
				fill,
				[attributeName]: startPoints
			})
			const toEnd = createSvgElement('animate', {
				to: endPoints,
				dur,
				fill: 'freeze',
				begin: 'indefinite',
				attributeName
			})
			const toStart = createSvgElement('animate', {
				to: startPoints,
				dur,
				fill: 'freeze',
				begin: 'indefinite',
				attributeName
			})

			endAnimations.push(toEnd)
			startAnimations.push(toStart)
			poly.append(toEnd, toStart)
			svg.append(poly)
		}

		let animationEnded = false
		parent.append(svg)
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
