import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserWithoutResponse } from '../../users/domain/interfaces/user-without.response';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GetUser } from './decorator/get-user.decorator';
import { Auth } from './decorator/auth.decorator';
import { LoginResponse } from '../application/response/login.response';
import { RecoverDto } from './dto/recover-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    return this.authService.login(loginAuthDto);
  }

  @Post('recover')
  recover(@Body() recoverDto: RecoverDto) {
    return this.authService.recover(recoverDto);
  }

  @Post('reset-password')
  @Auth()
  resetPassword(
    @GetUser() user: UserWithoutResponse,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(user, resetPasswordDto);
  }

  @Get('verify')
  @Auth()
  verify(@GetUser() user: UserWithoutResponse) {
    return this.authService.verify(user);
  }
}
