// Knight Rider's KITT-like lights 
// https://www.youtube.com/watch?v=oNyXYPhnUIs

window.addEventListener('load', function () {
	const cKitt = 'Kitt'
	const cLight = 'light'
	const cOn = 'on' // This CSS class makes a light shine.
	const nLights = 6
	const msSpeed = 166

	const Lights = []
	for (let i = 0; i < nLights; i++) {
		const light = document.createElement('div')
		light.className = cLight
		Lights.push(light)
	}
	document.querySelector('.' + cKitt).append(...Lights)

	const states = makeKittStates(nLights)
	let nState = 0
	setInterval(() => {
		for (let i = 0; i < Lights.length; i++)
			Lights[i].classList.toggle(cOn, states[nState][i])
		nState = (nState + 1) % states.length
	}, msSpeed)
})


;(function test() {
	const actual = makeKittStates(3)
	const expected = [
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[0, 1, 1],
		[1, 1, 1],
		[1, 1, 0],
		[1, 0, 0],
		[1, 1, 0],
		[1, 1, 1],
		[0, 1, 1]
	]

	for (let i = 0; i < expected.length; i++) {
		if (expected[i].length !== actual[i].length)
			throw `FAILED: The arrays at ${i} have different number of lights`

		for (let j = 0; j < expected[i].length; j++)
			if (expected[i][j] !== actual[i][j])
				throw `FAILED: The array at ${i} has a light at index: ${j} that doesn't match`
	}
}())


// Each light state is represented by a bit of an integer. 
function makeKittStates(nLights) {
	const binaryMaxValue = 2 ** nLights - 1 // e.g. 6 -> 0b111111
	const leftmostBit = 1 << (nLights - 1)  // e.g. 6 -> 0b100000

	let bitmap = 1
	const states = [bitmap]

	while (bitmap < leftmostBit) {
		bitmap <<= 1
		states.push(bitmap)
	}

	while (bitmap > 1) {
		bitmap >>= 1
		states.push(bitmap)
	}

	let rev = 1
	while (bitmap < binaryMaxValue) {
		rev <<= 1
		bitmap += rev
		states.push(bitmap)
	}

	rev = 1
	while (bitmap > leftmostBit) {
		bitmap -= rev
		rev <<= 1
		states.push(bitmap)
	}

	rev = leftmostBit
	while (bitmap < binaryMaxValue) {
		rev >>= 1
		bitmap += rev
		states.push(bitmap)
	}

	rev = leftmostBit
	while (bitmap > 2) {
		bitmap -= rev
		rev >>= 1
		states.push(bitmap)
	}

	return states.map(lights => lights // Numbers to BitArrays
		.toString(2) // to binary string
		.padStart(nLights, '0')
		.split('')
		.map(Number))
}
