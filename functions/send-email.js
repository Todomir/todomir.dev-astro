const nodemailer = require('nodemailer')
const { TRANSPORTER_EMAIL, TRANSPORTER_PASSWORD, RECAPTCHA_SECRET } = process.env

exports.handler = async function sendEmail(evt, ctx, callback) {
  if (evt.httpMethod !== 'POST') {
    return { statusCode: 405 }
  }

  const body = JSON.parse(evt.body);

  const data = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			secret: RECAPTCHA_SECRET,
			response: body.token,
		}),
	}).then(res => res.json())

  if (!data.success) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid reCAPTCHA' }) }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: '587',
    from: TRANSPORTER_EMAIL,
		auth: {
			user: TRANSPORTER_EMAIL,
			pass: TRANSPORTER_PASSWORD,
		},
	})

  const mailOptions = {
		from: TRANSPORTER_EMAIL,
    to: TRANSPORTER_EMAIL,
    replyTo: body.email,
		subject: body.subject,
		text: body.message,
		html: `
    <h1>You have a new contact request</h1>
    <h2>Contact Details</h2>
    <ul>  
      <li>Name: ${body.name}</li>
      <li>Email: ${body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${body.message}</p>
    `,
	}

  try {
    const info = await transporter.sendMail(mailOptions)
    callback(null, { statusCode: 200, body: JSON.stringify(info) })
  } catch (error) {
    callback(error)
  }
}