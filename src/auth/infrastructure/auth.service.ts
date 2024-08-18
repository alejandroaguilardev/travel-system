import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { LoginResponse } from '../application/response/login.response';
import { LoginUser } from '../application/login/login-user';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JWTAdapterService } from './services/jwt.service';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { GenerateToken } from '../application/token/generate';
import { RecoverDto } from './dto/recover-auth.dto';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { RecoverPassword } from '../application/recover/recover-password';
import { UserEmail } from '../../users/domain/value-object/user-email';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordUser } from '../application/reset-password/reset-password-user';
import { UserPassword } from '../../users/domain/value-object/user-password';
import { RecoverNotification } from '../application/notification/recover-notification';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly bcryptService: BcryptService,
    private laravelApiAdapter: LaravelApiAdapter,
    private jwtService: JWTAdapterService,
  ) { }

  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    const loginUser = new LoginUser(
      this.userMongoRepository,
      this.bcryptService,
      this.jwtService,
    );
    return await loginUser.login(loginAuthDto);
  }

  async verify(user: UserWithoutWithRoleResponse): Promise<LoginResponse> {
    const generateToken = new GenerateToken(this.jwtService);
    const token = generateToken.execute(user.id);
    return { user, token };
  }

  async recover({ email }: RecoverDto): Promise<ResponseSuccess> {
    const recoverPassword = new RecoverPassword(this.userMongoRepository);
    const user = await recoverPassword.execute(email);
    const generateToken = this.jwtService.generateToken(
      { id: user.id },
      { expiresIn: 86400 },
    );

    const mail = new RecoverNotification(this.laravelApiAdapter);
    await mail.execute(new UserEmail(user.email), generateToken);

    return { message: 'Revisa tu correo electrónico' };
  }

  async resetPassword(
    user: UserWithoutWithRoleResponse,
    { password }: ResetPasswordDto,
  ): Promise<LoginResponse> {
    const recoverPassword = new ResetPasswordUser(
      this.userMongoRepository,
      this.bcryptService,
      this.jwtService,
    );
    return recoverPassword.execute(new UserPassword(password), user);
  }
}
