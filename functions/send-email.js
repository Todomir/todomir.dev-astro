import nodemailer from 'nodemailer'
const { TRANSPORTER_EMAIL, TRANSPORTER_PASSWORD } = process.env

exports.handler = async function sendEmail(evt, ctx) {
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
    to: "contato@todomir.dev",
    subject: body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
			}
    }
    return {
      statusCode: 200,
      body: JSON.stringify(info.response)
		}
  })
}