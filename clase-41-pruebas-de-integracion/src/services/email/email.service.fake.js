export class FakeEmailService {

  constructor() {
    this.user = 'TEST_SENDER'
  }

  done(data) {
    console.log(JSON.stringify(data, null, 2))
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

    this.done(emailOptions)
  }
}
