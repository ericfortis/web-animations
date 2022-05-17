// KITT-like light animation
// Original animation: https://www.youtube.com/watch?v=oNyXYPhnUIs

// Each light is represented by a bit on an integer. The algorithm shifts bits left
// or right to produce the sequence. The `on` CSS class is what makes the light shine.

window.addEventListener('load', function () {
	const cKitt = 'Kitt'
	const cLight = 'light'
	const cOn = 'on'

	const N_LIGHTS = 6
	const SPEED_MS = 166

	const binaryMaxValue = 2 ** N_LIGHTS - 1 // 0b111111
	const leftmostBit = 1 << (N_LIGHTS - 1)  // 0b100000

	const Kitt = document.getElementsByClassName(cKitt)[0]
	for (let i = 0; i < N_LIGHTS; i++) {
		const light = document.createElement('div')
		light.className = cLight
		Kitt.append(light)
	}

	const Lights = Kitt.getElementsByClassName(cLight)

	const seq = makeSeq();
	(async function () {
		for (; ;)
			for (const s of seq) {
				for (let i = 0; i < Lights.length; i++)
					Lights[i].classList.toggle(cOn, s[i])
				await new Promise(resolve => setTimeout(resolve, SPEED_MS)) // delay
			}
	}())


	function makeSeq() {
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

		return states.map(lights => lights.toString(2).padStart(N_LIGHTS, '0').split('').map(Number))
	}
})
