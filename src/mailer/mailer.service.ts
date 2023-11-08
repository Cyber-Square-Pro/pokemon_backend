import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async sendMail(mail: {
    to: string;
    subject: string;
    template: string;
    context: object;
  }) {
    console.log('Mail has been sent to the user')
    console.log(mail)
  }
}
