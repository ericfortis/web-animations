// CSS: ./3d-carousel.css

const FaceIdAttr = 'data-for'

const FaceAttr = 'data-cubeface'
const FrontFace = 'cfFront'
const RightFace = 'cfRight'
const BackFace = 'cfBack'
const LeftFace = 'cfLeft'

const cRadioBtn = 'cubeRadioButton'
const cSelected = 'cubeSelected'

const cCubeScene = 'CubeScene'
const cCube = 'Cube'

const FaceElement = 'img'
const RotateDuration_ms = 740

/**
 * This code renders a cube on top of the face-element (e.g. video) during the
 * rotation transition. i.e. it's a cube on top of an opacity=0 face-element for the
 * duration of the animation. It's like this, because the `.vpRoot`
 * container is fluid, if it was discrete it would have been much easier.
 */
InitVideoGroups(document.body)
function InitVideoGroups(Section) {
	for (const button of Section.getElementsByClassName(cRadioBtn))
		button.addEventListener('change', function () {
			if (this.className.indexOf(cSelected) === -1) { // isNotSelected
				const oldBtn = Section.getElementsByClassName(cSelected)[0]
				const oldFace = document.getElementById(oldBtn.getAttribute(FaceIdAttr)).querySelector(FaceElement)
				const faceWidth = parseFloat(getComputedStyle(oldFace).width)

				RotateCube(Section, faceWidth, oldBtn.getAttribute(FaceAttr), this.getAttribute(FaceAttr))
				oldBtn.className = cRadioBtn
				this.className = cRadioBtn + ' ' + cSelected
			}
		})
}

let timer0
function RotateCube(Section, faceWidth, fromFace, toFace) {
	clearTimeout(timer0) // For fast clicking. It handles changing a video during a rotation.
	const CUBE_T = 'transform ' + RotateDuration_ms + 'ms ease-in-out'
	const scene = Section.getElementsByClassName(cCubeScene)[0]
	scene.style.perspective = faceWidth * 2 + 'px'

	updateFace(FrontFace, 0)
	updateFace(RightFace, 90)
	updateFace(BackFace, 180)
	updateFace(LeftFace, -90)

	function updateFace(className, angle) {
		const wrap = Section.getElementsByClassName(className)[0]
		if (wrap) {
			wrap.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + faceWidth / 2 + 'px)'
			wrap.style.display = 'block'
			wrap.style.backfaceVisibility = 'hidden'
			// Hiding the backfaceVisibility is also a workaround for a glitch when resizing.
			// For instance, if we did transform: rotateY(-90deg) translateX(100%)
			// rotateY(90deg); see https://stackoverflow.com/a/20226596 this would
			// not be needed to fix the side faces going visible through the sides
		}
	}


	// This is needed because ATM, we need the width to set initial face
	// cube in 3D space. Therefore, we are going through this overhead
	// for now. See the right way in the backfaceVisibility comment above
	const cube = Section.getElementsByClassName(cCube)[0]
	cube.style.transform = cubeRotations(fromFace)
	timer0 = setTimeout(function () {
		cube.style.transition = CUBE_T
		cube.style.transform = cubeRotations(toFace)
		allowFocusOnVisibleVideoFace()
	}, 100) // I don't know why this has to be longer than one raf


	function allowFocusOnVisibleVideoFace() { // only for videos
		const faces = Section.getElementsByTagName('video')
		for (const face of faces)
			face.nextElementSibling.setAttribute('tabindex', '-1')

		const currVideoPlayButton = Section.querySelector('.' + toFace + ' video + button')
		if (currVideoPlayButton) 
			currVideoPlayButton.setAttribute('tabindex', '0')
	}

	function cubeRotations(face) {
		switch (face) {
			case FrontFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(0deg)'
			case RightFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(-90deg)'
			case BackFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(-180deg)'
			case LeftFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(90deg)'
		}
	}
}
