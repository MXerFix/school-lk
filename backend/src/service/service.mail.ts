import nodemailer, { Transporter } from 'nodemailer'
class MailService {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'xajlonefpemob@gmail.com',
        pass: 'ywwn jjzz vwvr chwi'
      }
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: 'xajlonefpemob@gmail.com',
      to,
      subject: 'Test',
      html: `
      <div>
      <h1> TEST </h1>
      <a href="http://localhost:5000/api/v1/user/activate/${link}"> link </a>
      </div>
      `
    })
  }

}

export default new MailService