import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { LoginResponse } from '../application/response/login.response';
import { LoginUser } from '../application/login/login-user';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JWTAdapterService } from './services/jwt.service';
import { UserWithoutResponse } from '../../users/domain/interfaces/user-without.response';
import { GenerateToken } from '../application/token/generate';

@Injectable()
export class AuthService {
  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly bcryptService: BcryptService,
    private jwtService: JWTAdapterService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    const loginUser = new LoginUser(
      this.userMongoRepository,
      this.bcryptService,
      this.jwtService,
    );
    return await loginUser.login(loginAuthDto);
  }

  async verify(user: UserWithoutResponse): Promise<LoginResponse> {
    const generateToken = new GenerateToken(this.jwtService);
    const token = generateToken.execute(user.id);
    return { user, token };
  }
}
