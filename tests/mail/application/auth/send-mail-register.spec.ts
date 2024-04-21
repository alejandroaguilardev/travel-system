import { SendMailRegister } from '../../../../src/mail/application/auth/send-mail-register';
import { UserCreatorMother } from '../../../users/domain/create-user-mother';
import { UserEmail } from '../../../../src/users/domain/value-object/user-email';
import { UserPassword } from '../../../../src/users/domain/value-object/user-password';
import { transportMock } from '../../domain/transporter.mock';
import { UserDocument } from '../../../../src/users/domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../../../src/users/domain/value-object/profile/user-document-number';

describe('sendMailRegister', () => {
  const sendMailRegister = new SendMailRegister(transportMock);

  it('should_successfully_mail_auth_register', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const document = new UserDocument(user.profile.document);
    const documentNumber = new UserDocumentNumber(user.profile.documentNumber);
    const password = new UserPassword(UserPassword.generatePassword());
    const resolved = await sendMailRegister.execute(
      email,
      document,
      documentNumber,
      password,
    );
    expect(resolved).toBe(undefined);
  });

  it('should_successfully_mail_auth_register_to_have_been_called_with', async () => {
    const user = UserCreatorMother.create();
    const email = new UserEmail(user.email);
    const document = new UserDocument(user.profile.document);
    const documentNumber = new UserDocumentNumber(user.profile.documentNumber);
    const password = new UserPassword(UserPassword.generatePassword());
    await sendMailRegister.execute(email, document, documentNumber, password);
    const haveCalled = sendMailRegister.options(
      email,
      sendMailRegister.getHtml(document, documentNumber, password),
    );
    expect(transportMock.sendMail).toHaveBeenCalledWith(haveCalled);
  });
});
