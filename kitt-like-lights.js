// KITT-like lights https://www.youtube.com/watch?v=oNyXYPhnUIs

window.addEventListener('load', async function () {
	const cKitt = 'Kitt'
	const cLight = 'light'
	const cOn = 'on' // This CSS class makes a light shine.
	const N_LIGHTS = 6
	const SPEED_MS = 166

	const Lights = []
	for (let i = 0; i < N_LIGHTS; i++) {
		const light = document.createElement('div')
		light.className = cLight
		Lights.push(light)
	}
	document.getElementsByClassName(cKitt)[0].append(...Lights)

	const seq = makeKittSeq(N_LIGHTS)
	for (; ;)
		for (const seqLine of seq) {
			for (let i = 0; i < Lights.length; i++)
				Lights[i].classList.toggle(cOn, seqLine[i])
			await new Promise(resolve => setTimeout(resolve, SPEED_MS)) // delay
		}
})


// Each light state is represented by a bit on an integer. 
function makeKittSeq(nLights) {
	const binaryMaxValue = 2 ** nLights - 1 // e.g. 6 -> 0b111111
	const leftmostBit = 1 << (nLights - 1)  // e.g. 6 -> 0b100000

	const states = []
	let lights = 1

	while (lights < leftmostBit) {
		lights = lights << 1
		states.push(lights)
	}

	while (lights > 1) {
		lights = lights >> 1
		states.push(lights)
	}

	let rev = 1
	while (lights < binaryMaxValue) {
		rev = rev << 1
		lights += rev
		states.push(lights)
	}

	rev = 1
	while (lights > leftmostBit) {
		lights -= rev
		rev = rev << 1
		states.push(lights)
	}

	rev = leftmostBit
	while (lights < binaryMaxValue) {
		rev = rev >> 1
		lights += rev
		states.push(lights)
	}

	rev = leftmostBit
	while (lights > 1) {
		lights -= rev
		rev = rev >> 1
		states.push(lights)
	}

	return states.map(lights => lights // Numbers to BitArrays
		.toString(2)
		.padStart(nLights, '0')
		.split('')
		.map(Number))
}


/* === TEST === */
const actual = makeKittSeq(3)
const expected = [
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
	[0, 1, 1],
	[0, 0, 1]
]

for (let i = 0; i < expected.length; i++) {
	if (expected[i].length !== actual[i].length)
		throw `FAILED: The arrays at ${i} have different number of lights`

	for (let j = 0; j < expected[i].length; j++)
		if (expected[i][j] !== actual[i][j])
			throw `FAILED: The array at ${i} has a light at index: ${j} that doesn't match`
}
