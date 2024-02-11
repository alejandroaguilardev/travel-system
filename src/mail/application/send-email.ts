export class SendEmail {
  constructor(private readonly transporter: any) {}

  async execute(
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments?: { filename: string; path: string }[],
  ): Promise<void> {
    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to,
      subject,
      text,
      html,
      attachments,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
