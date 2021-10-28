<script>
  export let onSubmit
  export let recaptchaKey

  let formRef

  const handleSubmit = e => {
    e.preventDefault()

    grecaptcha.ready(() => {
      const formData = new FormData(e.target)

      const data = {}
      for (let field of formData) {
        const [key, value] = field
        data[key] = value
      }

      grecaptcha
        .execute(recaptchaKey, { action: 'submit' })
        .then(token => onSubmit({ ...data, token }))
        .then(() => { formRef.reset() })
    })
  }
</script>

<form bind:this={formRef} on:submit|preventDefault={handleSubmit}>
  <slot />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>
