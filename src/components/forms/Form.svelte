<script>
	export let onSubmit
	export let recaptchaKey

	const handleSubmit = e => {
    e.preventDefault();

		grecaptcha.ready(() => {
			const formData = new FormData(e.target)

			const data = {}
			for (let field of formData) {
				const [key, value] = field
				data[key] = value
			}

			grecaptcha.execute(recaptchaKey, { action: 'submit' }).then(async token => {
				await onSubmit({ ...data, token })
			})
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
