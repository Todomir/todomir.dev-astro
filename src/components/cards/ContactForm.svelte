<script>
  import Form from '../forms/Form.svelte'
  import Input from '../forms/Input.svelte'
  import Textarea from '../forms/Textarea.svelte'

  const onSubmit = async (data) => {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const json = await response.json()
      console.log(json)
    } else {
      alert('Error sending message')
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
    <button type="submit" class="btn-dark">Send me an email</button>
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

    p {
      max-width: 35ch;
      margin-top: clamp(1.6rem, 1.1602rem + 1.0624vw, 3.2rem);
      margin-bottom: clamp(8rem, 6.9004rem + 2.6560vw, 12rem);;
    }
  }
</style>