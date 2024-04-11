import { UserCreatorMother } from '../../../users/domain/create-user-mother';
import { UserEmail } from '../../../../src/users/domain/value-object/user-email';
import { transportMock } from '../../domain/transporter.mock';
import { SendMailNewContract } from '../../../../src/mail/application/contracts/send-mail-new-contract';
import { ContractCreatorMother } from '../../../contracts/domain/contract-creator.mother';
import { CommandContractUpdater } from '../../../../src/contracts/application/update/command-contract-updater';
import { userRepositoryMock } from '../../../users/domain/user-repository-mock-methods';
import { UserResponse } from '../../../../src/users/domain/interfaces/user.response';

describe('sendMailNewContract', () => {
  const sendMail = new SendMailNewContract(transportMock, userRepositoryMock);

  it('should_successfully_mail_new_contract', async () => {
    const user = UserCreatorMother.create();
    const contractPrimitives = ContractCreatorMother.createWithTravel();
    const contract = CommandContractUpdater.execute(contractPrimitives);
    userRepositoryMock.searchById.mockResolvedValue(user);
    const resolved = await sendMail.execute(contract);
    expect(resolved).toBe(undefined);
  });

  it('should_successfully_mail_new_contract_to_have_been_called_with', async () => {
    const user = UserCreatorMother.create();
    const contractPrimitives = ContractCreatorMother.createWithTravel();
    const email = new UserEmail(user.email);
    const contract = CommandContractUpdater.execute(contractPrimitives);
    userRepositoryMock.searchById.mockResolvedValue(user);
    await sendMail.execute(contract);
    const haveCalled = sendMail.options(
      email,
      contract,
      sendMail.getHtml(user as UserResponse, user.profile.phone),
    );
    expect(transportMock.sendMail).toHaveBeenCalledWith(haveCalled);
  });
});
