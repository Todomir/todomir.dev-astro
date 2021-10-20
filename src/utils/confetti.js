import Confetti from 'canvas-confetti'

function fire(particleRatio, opts) {
	Confetti(
		Object.assign({}, { origin: { y: 0.7 } }, opts, {
			particleCount: Math.floor(200 * particleRatio),
		})
	)
}

export async function confetti() {
	return await new Promise(resolve => {
		setTimeout(() => {
			formState = 'success'
			fire(0.25, {
				spread: 26,
				startVelocity: 55,
			})
			fire(0.2, {
				spread: 60,
			})
			fire(0.35, {
				spread: 100,
				decay: 0.91,
				scalar: 0.8,
			})
			fire(0.1, {
				spread: 120,
				startVelocity: 25,
				decay: 0.92,
				scalar: 1.2,
			})
			fire(0.1, {
				spread: 120,
				startVelocity: 45,
			})
			resolve()
		}, 2000)
	})
}
