import { UserCreatorMother } from '../../../users/domain/create-user-mother';
import { UserEmail } from '../../../../src/users/domain/value-object/user-email';
import { transportMock } from '../../domain/transporter.mock';
import { SendMailResetPassword } from '../../../../src/mail/application/auth/send-mail-reset-password';

describe('sendMailResetPassword', () => {
  const sendMail = new SendMailResetPassword(transportMock);

  it('should_successfully_mail_auth_reset_password', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const token = 'token';
    const resolved = await sendMail.execute(email, token);
    expect(resolved).toBe(undefined);
  });

  it('should_successfully_mail_auth_reset_password_to_have_been_called_with', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const token = 'token';
    await sendMail.execute(email, token);
    const haveCalled = sendMail.options(email, sendMail.getHtml(token));
    expect(transportMock.sendMail).toHaveBeenCalledWith(haveCalled);
  });
});
