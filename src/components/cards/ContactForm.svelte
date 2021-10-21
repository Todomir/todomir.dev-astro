<script>
  import axios from 'redaxios'

	import { confetti } from '../../utils'

	import Form from '../forms/Form.svelte'
	import Input from '../forms/Input.svelte'
	import Textarea from '../forms/Textarea.svelte'

	import prismicDom from 'prismic-dom'

	// Props
	export let slice
	export let recaptchaKey

	// State
	let formState = 'idle'

	$: fields = slice.fields.map(field => field.fields.data)

	const sendEmail = async data => {
		try {
			const response = await axios.post('/.netlify/functions/send-email', data)

			if (response.status === 200) {
				await confetti()
        formState = 'success'
			} else {
				formState = 'error'
			}
		} catch (error) {
			formState = 'error'
		} finally {
			await new Promise(resolve =>
				setTimeout(() => {
					formState = 'idle'
					resolve()
				}, 2000)
			)
		}
	}

	const onSubmit = async (data) => {
		formState = 'loading'
    await sendEmail(data)
	}
</script>

<section id="contact">
	<h1>{prismicDom.RichText.asText(slice.data.title)}</h1>
	<p>{prismicDom.RichText.asText(slice.data.description)}</p>
	<Form {onSubmit} {recaptchaKey}>
		{#each fields as field}
			{#if field.field === 'input'}
				<Input required type={field.type} name={field.name} label={field.label} placeholder={field.placeholder} icon={field.icon} />
			{:else if field.field === 'textarea'}
				<Textarea required rows="5" name={field.name} label={field.label} placeholder={field.placeholder} />
			{:else}
				Field does not exist
			{/if}
		{/each}
		<button class={`btn btn-dark ${formState} g-recaptcha`}>
			{#if formState === 'loading'}
				{slice.data.cta_loading}
			{:else if formState === 'success'}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				{slice.data.cta_success}
			{:else if formState === 'error'}
				{slice.data.cta_error}
			{:else}
				{slice.data.cta_label}
			{/if}
		</button>
	</Form>
</section>

<style lang="scss">
	section {
		--padding-inline: clamp(4.4rem, 3.0805rem + 3.1873vw, 9.2rem);

		background-color: var(--color-white);
		border-radius: 30px;

		padding-block: 100px;
		padding-inline: var(--padding-inline);

		max-width: 95.3rem;
		margin: 0 auto;

		@media screen and (max-width: 768px) {
			width: calc(80% + (var(--body-padding) * 2));
			margin-inline: calc(-0.7 * var(--body-padding));
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 24px;

			position: relative;
		}

		p {
			max-width: 35ch;
			margin-top: clamp(1.6rem, 1.1602rem + 1.0624vw, 3.2rem);
			margin-bottom: clamp(8rem, 6.9004rem + 2.656vw, 12rem);
		}

		.loading {
			opacity: 0.8;
			cursor: progress;
		}
	}
</style>
