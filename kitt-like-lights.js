// KITT-like light animation
// Original animation: https://www.youtube.com/watch?v=oNyXYPhnUIs

window.addEventListener('load', function () {
	const cKitt = 'Kitt'
	const cLight = 'light'
	const cOn = 'on'

	const SPEED = 166
	const N_LIGHTS = 6
	const MAX_VAL = 0b111111 // 6 lights (1 bit per light)
	const LEFTMOST_BIT = 1 << (N_LIGHTS - 1)

	async function sleep() {
		await new Promise(resolve => setTimeout(resolve, SPEED))
	}

	const Kitt = document.querySelector('.' + cKitt)
	for (let i = 0; i < N_LIGHTS; i++) {
		const light = document.createElement('div')
		light.className = cLight
		Kitt.append(light)
	}

	const Lights = Kitt.querySelectorAll('.' + cLight)
	function print(arr) {
		Lights.forEach((light, i) => {
			light.classList.toggle(cOn, arr[i])
		})
	}

	async function animateCycle() {
		let lights = 1

		while (lights < LEFTMOST_BIT) {
			lights = lights << 1;
			await tick()
		}

		while (lights > 1) {
			lights = lights >> 1;
			await tick()
		}

		let seq2 = 1;
		while (lights < MAX_VAL) {
			seq2 = seq2 << 1
			lights += seq2
			await tick()
		}

		seq2 = 1
		while (lights > LEFTMOST_BIT) {
			lights -= seq2
			seq2 = seq2 << 1
			await tick()
		}

		seq2 = LEFTMOST_BIT
		while (lights < MAX_VAL) {
			seq2 = seq2 >> 1
			lights += seq2
			await tick()
		}

		seq2 = LEFTMOST_BIT
		while (lights > 1) {
			lights -= seq2
			seq2 = seq2 >> 1
			await tick()
		}

		async function tick() {
			print(lights.toString(2).padStart(N_LIGHTS, '0').split('').map(Number))
			await sleep()
		}

		animateCycle()
	}

	animateCycle()
})
