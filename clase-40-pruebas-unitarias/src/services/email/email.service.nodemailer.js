import nodemailer from 'nodemailer'

export class NodemailerEmailService {

  constructor(nodemailerConfig) {
    this.transport = nodemailer.createTransport(nodemailerConfig)
    this.user = nodemailerConfig.auth.user
  }

  async send(destinatario, asunto, mensaje, adjuntos = []) {
    const emailOptions = {
      from: this.user,
      to: destinatario,
      subject: asunto,
      text: mensaje
    }

    if (adjuntos.length > 0) {
      emailOptions.attachments = adjuntos
    }

    await this.transport.sendMail(emailOptions)
  }
}
