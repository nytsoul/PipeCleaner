import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '2525', 10),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: { email: string; subject: string; message: string }) {
    const mailOptions = {
      from: 'PipeBloom <noreply@pipebloom.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
