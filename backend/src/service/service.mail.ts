import nodemailer, { Transporter } from 'nodemailer'
class MailService {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.nic.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'pk@jftl.ru',
        // pass: 'ywwn jjzz vwvr chwi'
        pass: 'B%qN%4n99PNhi2Ke'
      }
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: 'pk@jftl.ru',
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