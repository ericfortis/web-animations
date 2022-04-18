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

	const binaryMaxValue = 2 ** (N_LIGHTS - 1) // 0b111111
	const leftmostBit = 1 << (N_LIGHTS - 1)  // 0b100000

	const Kitt = document.querySelector('.' + cKitt)
	for (let i = 0; i < N_LIGHTS; i++) {
		const light = document.createElement('div')
		light.className = cLight
		Kitt.append(light)
	}

	const Lights = Kitt.querySelectorAll('.' + cLight)
	function update(lightStatesArr) {
		Lights.forEach((light, i) => {
			light.classList.toggle(cOn, lightStatesArr[i])
		})
	}

	async function animateCycle() {
		let lights = 1

		while (lights < leftmostBit) {
			lights = lights << 1
			await tick()
		}

		while (lights > 1) {
			lights = lights >> 1
			await tick()
		}

		let seq2 = 1
		while (lights < binaryMaxValue) {
			seq2 = seq2 << 1
			lights += seq2
			await tick()
		}

		seq2 = 1
		while (lights > leftmostBit) {
			lights -= seq2
			seq2 = seq2 << 1
			await tick()
		}

		seq2 = leftmostBit
		while (lights < binaryMaxValue) {
			seq2 = seq2 >> 1
			lights += seq2
			await tick()
		}

		seq2 = leftmostBit
		while (lights > 1) {
			lights -= seq2
			seq2 = seq2 >> 1
			await tick()
		}

		async function tick() {
			update(lights.toString(2).padStart(N_LIGHTS, '0').split('').map(Number))
			await sleep()
		}
		
		async function sleep() {
			await new Promise(resolve => setTimeout(resolve, SPEED_MS))
		}

		animateCycle()
	}
	
	animateCycle()
})
