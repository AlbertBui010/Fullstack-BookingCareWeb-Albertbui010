require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for port 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	const info = await transporter.sendMail({
		from: '"Albert 👻" <buiquangquy12823@gmail.com>', // sender address
		to: data.receiverEmail, // list of receivers
		subject: 'Thông tin đặt lịch khám bệnh', // Subject line
		text: 'Hello world?', // plain text body
		html: `
      <h3>Xin chào ${data.patientName}</h3>

      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare Albert!!</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${data.time}</b></div>
      <div><b>Bác sĩ: ${data.doctorName}</b></div>
      <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div>
      <a href=${data.redirectLink} target='_blank'>Click here</a>
      </div>
      <div>Xin chân thành cám ơn</div>
    `, // html body
	});
};

module.exports = {
	sendSimpleEmail: sendSimpleEmail,
};
