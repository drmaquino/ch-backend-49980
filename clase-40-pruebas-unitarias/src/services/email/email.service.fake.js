export class FakeEmailService {

  constructor() {
    this.user = 'TEST_SENDER'
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

    console.log(JSON.stringify(emailOptions, null, 2))
  }
}
