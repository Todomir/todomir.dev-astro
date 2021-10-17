import nodemailer from 'nodemailer'
const { TRANSPORTER_EMAIL, TRANSPORTER_PASSWORD } = process.env

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
  }

  const body = JSON.parse(req.body);

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
    res.status(200).json(info)
  } catch (error) {
    res.status(500).json(error)
  }
}