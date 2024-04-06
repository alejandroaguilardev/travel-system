import { UserCreatorMother } from '../../../users/domain/create-user-mother';
import { transportMock } from '../../domain/transporter.mock';
import { ContractCreatorMother } from '../../../contracts/domain/contract-creator.mother';
import { userRepositoryMock } from '../../../users/domain/user-repository-mock-methods';
import { SendMailUpdateDocumentation } from '../../../../src/mail/application/contracts/send-mail-documentation';
import { ContractDetailCreatorMother } from '../../../contract-detail/domain/contract-creator.mother';
import { dateServiceMock } from '../../../common/domain/date.service.mock';

describe('sendMailUpdateDocumentation', () => {
  const sendMail = new SendMailUpdateDocumentation(
    transportMock,
    userRepositoryMock,
    dateServiceMock,
  );

  it('should_successfully_mail_new_contract', async () => {
    const user = UserCreatorMother.create();
    const contract = ContractCreatorMother.createResponse();
    const details = ContractDetailCreatorMother.createWithPet();

    userRepositoryMock.searchById.mockResolvedValue(user);
    const resolved = await sendMail.execute({
      contract,
      contractDetail: details,
    });
    expect(resolved).toBe(undefined);
  });
});
