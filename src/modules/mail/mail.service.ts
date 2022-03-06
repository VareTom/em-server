import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactMailInputDto } from 'src/core/dtos/mail/ContactMailInputDto';

@Injectable()
export class MailService {
  
  constructor(private readonly mailerService: MailerService) {}
  
  contact(contactMailInput: ContactMailInputDto): Promise<Boolean> {
    return this.mailerService.sendMail({
      to: process.env.MAIL_USER,
      from: contactMailInput.email,
      subject: 'SUPPORT APP : '+ contactMailInput.subject,
      template: 'contact',
      context: {
        ...contactMailInput
      }
    })
      .then(() => { return true; })
      .catch((err) => {
        console.log(err);
        throw new HttpException('Cannot send email', HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
