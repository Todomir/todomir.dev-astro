const nodemailer = require('nodemailer')
const { TRANSPORTER_EMAIL, TRANSPORTER_PASSWORD } = process.env

exports.handler = async function sendEmail(evt, ctx, callback) {
  if (evt.httpMethod !== 'POST') {
    return { statusCode: 405 }
  }

  const body = JSON.parse(evt.body);

  const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
		auth: {
			user: TRANSPORTER_EMAIL,
			pass: TRANSPORTER_PASSWORD,
		},
	})

  const mailOptions = {
    from: body.email,
    to: TRANSPORTER_EMAIL,
    subject: body.subject,
    text: body.message,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    callback(null, { statusCode: 200, body: JSON.stringify(info) })
  } catch (error) {
    callback(error)
  }
}