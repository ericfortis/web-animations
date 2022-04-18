var FaceIdAttr = 'data-for';

var FaceAttr = 'data-cubeface';
var FrontFace = 'cfFront';
var RightFace = 'cfRight';
var BackFace = 'cfBack';
var LeftFace = 'cfLeft';

var cRadioBtn = 'cubeRadioButton';
var cSelected = 'cubeSelected';

var cCubeScene = 'CubeScene';
var cCube = 'Cube';

var FaceElement = 'img'
var RotateDuration_ms = 740;

/**
 * This works by rendering a cube on top of the video during the
 * transition. i.e. it's a cube on top of a opacity=0 video for the
 * duration of the animation. It's like this, because the vpRoot
 * container is fluid, if it was discrete it would have been much easier.
 */
InitVideoGroups(document.body);
function InitVideoGroups(Section) {
	var buttons = Section.getElementsByClassName(cRadioBtn);
	for (var i = 0; i < buttons.length; ++i)
		buttons[i].addEventListener('click', function () { // hitting space when focus also fires a "click"
			if (this.className.indexOf(cSelected) === -1) { // isNotSelected
				var oldBtn = Section.getElementsByClassName(cSelected)[0];
				var oldFace = document.getElementById(oldBtn.getAttribute(FaceIdAttr)).querySelector(FaceElement);
				var faceWidth = parseFloat(getComputedStyle(oldFace).width);

				RotateCube(Section, faceWidth, oldBtn.getAttribute(FaceAttr), this.getAttribute(FaceAttr));

				oldBtn.className = cRadioBtn;
				this.className = cRadioBtn + ' ' + cSelected;
			}
		});
}

var timer0;
function RotateCube(Section, faceWidth, fromFace, toFace) {
	clearTimeout(timer0); // For fast clicking. It handles changing a video during a rotation.

	var CUBE_T = 'transform ' + RotateDuration_ms + 'ms ease-in-out';

	var scene = Section.getElementsByClassName(cCubeScene)[0];
	scene.style.perspective = faceWidth * 2 + 'px';

	updateFace(FrontFace, 0);
	updateFace(RightFace, 90);
	updateFace(BackFace, 180);
	updateFace(LeftFace, -90);

	function updateFace(className, angle) {
		var wrap = Section.getElementsByClassName(className)[0];
		if (wrap) {
			wrap.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + faceWidth / 2 + 'px)';
			wrap.style.display = 'block';
			wrap.style.backfaceVisibility = 'hidden';
			// Hiding the backfaceVisibility is also a workaround for a glitch when resizing.
			// For instance, if we did transform: rotateY(-90deg) translateX(100%)
			// rotateY(90deg); see https://stackoverflow.com/a/20226596 this would
			// not be needed to fix the side faces going visible through the sides
		}
	}


	// This is needed because ATM, we need the width to set initial face
	// cube in 3D space. Therefore, we are going through this overhead
	// for now. See the right way in the backfaceVisibility comment above
	var cube = Section.getElementsByClassName(cCube)[0];
	cube.style.transform = cubeRotations(fromFace);
	timer0 = setTimeout(function () {
		cube.style.transition = CUBE_T;
		cube.style.transform = cubeRotations(toFace);
		focusOnVisibleFace();
	}, 100); // I don't know why this has to be longer than one raf


	function focusOnVisibleFace() { // only for videos
		var faces = Section.getElementsByTagName('video');
		for (var j = 0; j < faces.length; ++j)
			faces[j].nextElementSibling.setAttribute('tabindex', '-1');

		var currVideoPlayButton = Section.querySelector('.' + toFace + ' video + button');
		if (currVideoPlayButton) {
			currVideoPlayButton.setAttribute('tabindex', '0');
			currVideoPlayButton.focus();
		}
	}

	function cubeRotations(face) {
		switch (face) {
			case FrontFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(0deg)';
			case RightFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(-90deg)';
			case BackFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(-180deg)';
			case LeftFace:
				return 'translateZ(' + faceWidth / -2 + 'px) rotateY(90deg)';
		}
	}
}