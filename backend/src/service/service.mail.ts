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
      subject: 'Активация аккаунта в личном кабинете JFTL',
      html: `
      <div>
      <h1> Для активации аккаунта перейдите по <a href="${process.env.API_URL}/api/v1/activate?activation_link=${link}">ссылке</a> </h1>
      </div>
      `
    })
  }

}

export default new MailService