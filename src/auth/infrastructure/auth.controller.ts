import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserWithoutResponse } from '../../users/application/response/user-without.response';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GetUser } from './decorator/get-user.decorator';
import { Auth } from './decorator/auth.decorator';
import { LoginResponse } from '../application/response/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    return this.authService.login(loginAuthDto);
  }

  @Get('verify')
  @Auth()
  verify(@GetUser() user: UserWithoutResponse) {
    return this.authService.verify(user);
  }
}
