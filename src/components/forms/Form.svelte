<script>
	export let onSubmit
  export let recaptchaKey

	const handleSubmit = e => {
		const formData = new FormData(e.target)

		const data = {}
		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}

		grecaptcha.ready(() => {
			grecaptcha.execute(recaptchaKey, { action: 'submit' }).then(token => onSubmit({ ...data, token }))
		})
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
