import { SendMailRegister } from '../../../../src/mail/application/auth/send-mail-register';
import { UserCreatorMother } from '../../../users/domain/create-user-mother';
import { UserEmail } from '../../../../src/users/domain/value-object/user-email';
import { UserPassword } from '../../../../src/users/domain/value-object/user-password';
import { transportMock } from '../../domain/transporter.mock';

describe('sendMailRegister', () => {
  const sendMailRegister = new SendMailRegister(transportMock);

  it('should_successfully_mail_auth_register', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const password = new UserPassword(UserPassword.generatePassword());
    const resolved = await sendMailRegister.execute(email, password);
    expect(resolved).toBe(undefined);
  });

  it('should_successfully_mail_auth_register_to_have_been_called_with', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const password = new UserPassword(UserPassword.generatePassword());
    await sendMailRegister.execute(email, password);
    const haveCalled = sendMailRegister.options(
      email,
      sendMailRegister.getHtml(email, password),
    );
    expect(transportMock.sendMail).toHaveBeenCalledWith(haveCalled);
  });
});
