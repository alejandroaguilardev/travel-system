import { Repository } from '../../common/domain/repository';
import { User } from './user';
import { UserEmail } from './value-object/user-email';
import { UserResponse, UserResponseWithRole } from './interfaces/user.response';
import { Uuid } from '../../common/domain/value-object/uuid';
import { UserPassword } from './value-object/user-password';
import { UserProfile } from './value-object/user-profile';
import { UserDocument } from './value-object/profile/user-document';
import { UserDocumentNumber } from './value-object/profile/user-document-number';
import { UserInterface } from './interfaces/user.interface';

export interface UserRepository extends Repository<User> {
  searchEmail(email: UserEmail): Promise<UserResponse | null>;
  searchDocument(
    document: UserDocument,
    documentNumber: UserDocumentNumber,
  ): Promise<UserInterface | null>;
  updatePassword(
    uuid: Uuid,
    password: UserPassword,
  ): Promise<UserResponse | null>;
  updateProfile(
    uuid: Uuid,
    userProfile: UserProfile,
  ): Promise<UserResponse | null>;
  searchByIdWithRole(uuid: Uuid): Promise<UserResponseWithRole | null>;
}
