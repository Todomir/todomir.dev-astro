<script>
  import Form from '../forms/Form.svelte'
  import Input from '../forms/Input.svelte'
  import Textarea from '../forms/Textarea.svelte'

  import confetti from 'canvas-confetti'

  let formState = 'idle';

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, { origin: { y: 0.7 } }, opts, {
      particleCount: Math.floor(200 * particleRatio)
    }));
  }

  const onSubmit = async (data) => {
    formState = 'loading';

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data})
      })

      if (response.ok) {
        await new Promise((resolve) => {
          setTimeout(() => {
            formState = 'success';
            fire(0.25, {
              spread: 26,
              startVelocity: 55,
            });
            fire(0.2, {
              spread: 60,
            });
            fire(0.35, {
              spread: 100,
              decay: 0.91,
              scalar: 0.8
            });
            fire(0.1, {
              spread: 120,
              startVelocity: 25,
              decay: 0.92,
              scalar: 1.2
            });
            fire(0.1, {
              spread: 120,
              startVelocity: 45,
            });
            resolve();
          }, 2000)
        })
      } else {
        formState = 'error';
      }
    } catch (error) {
      formState = 'error';
    } finally {
      await new Promise((resolve) => setTimeout(() => {
        formState = 'idle';
        resolve();
      }, 2000))
    }
  }
</script>
<section>
  <h1>Let’s keep talking...</h1>
  <p>Have any questions, what so say hi or just want to start a new project? Drop a message below!</p>
  <Form onSubmit={onSubmit}>
    <Input required type="email" name="email" label="Email" placeholder="john@doe.com">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    </Input>
    <Input required type="text" name="subject" label="Subject" placeholder="My new banger website">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </Input>
    <Textarea required name="message" label="Message" rows="5" placeholder="Your awesome message ^o^" />
    <button type="submit" class={`btn btn-dark ${formState}`}>
      {#if formState === 'loading'}
        Sending email...
      {:else if formState === 'success'}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Email sent successfully
      {:else if formState === 'error'}
        Error while sending email
      {:else}
        Send me an email
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
      margin-bottom: clamp(8rem, 6.9004rem + 2.6560vw, 12rem);;
    }

    .loading {
      opacity: 0.8;
      cursor: progress;
    }
  }
</style>