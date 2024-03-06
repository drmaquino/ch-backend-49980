import { EMAIL_CONFIG_ETHEREAL, EMAIL_CONFIG_GMAIL, MODE } from '../../config/config.js'

import { NodemailerEmailService } from './email.service.nodemailer.js'
import { FakeEmailService } from './email.service.fake.js'

let emailService

if (MODE === 'production') {
  emailService = new NodemailerEmailService(EMAIL_CONFIG_GMAIL)
} else if (MODE === 'testing') {
  emailService = new FakeEmailService()
} else {
  emailService = new NodemailerEmailService(EMAIL_CONFIG_ETHEREAL)
}

export { emailService }
