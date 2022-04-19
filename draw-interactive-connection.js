/**
 * A Bezier curve between two Points for drawing smooth connections.
 * Path "M:p1 C:p1Anchor p2Anchor p2"
 */
function describeCurve(x1, y1, x2, y2) {
	const xAnchorDelta = ((Math.abs(y2 - y1) + Math.abs(x2 - x1)) >> 2) | 0
	return `M${x1},${y1} C${x1 + xAnchorDelta},${y1} ${x2 - xAnchorDelta},${y2} ${x2},${y2}`
}


window.addEventListener('load', function () {
	const board = document.getElementById('InteractiveConnectionTarget')
	const conn = document.getElementById('InteractiveConnection')

	let xStart = 0
	let yStart = 0

	function onMove({ offsetX, offsetY }) {
		if (offsetX > xStart)
			conn.setAttribute('d', describeCurve(xStart, yStart, offsetX, offsetY))
		else
			conn.setAttribute('d', describeCurve(offsetX, offsetY, xStart, yStart))
	}

	board.addEventListener('pointerdown', function (event) {
		event.preventDefault()
		board.setPointerCapture(event.pointerId)
		xStart = event.offsetX
		yStart = event.offsetY
		board.addEventListener('pointermove', onMove)
	})

	board.onpointerup = function () {
		board.removeEventListener('pointermove', onMove)
	}

	board.onpointercancel = function (event) {
		board.releasePointerCapture(event.pointerId)
		board.removeEventListener('pointermove', onMove)
	}
})
