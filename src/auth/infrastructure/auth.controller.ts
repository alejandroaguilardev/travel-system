import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { LoginAuthDto } from './dto/login-auth.dto';
import { GetUser } from './decorator/get-user.decorator';
import { Auth } from './decorator/auth.decorator';
import { LoginResponse } from '../application/response/login.response';
import { RecoverDto } from './dto/recover-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { DocsRecover, DocsResetPassword, DocsLogin, DocsVerify } from './docs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(200)
  @DocsLogin()
  login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    return this.authService.login(loginAuthDto);
  }

  @Post('recover')
  @HttpCode(200)
  @DocsRecover()
  recover(@Body() recoverDto: RecoverDto) {
    return this.authService.recover(recoverDto);
  }

  @Post('reset-password')
  @Auth()
  @HttpCode(200)
  @DocsResetPassword()
  resetPassword(
    @GetUser() user: UserWithoutWithRoleResponse,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(user, resetPasswordDto);
  }

  @Get('verify')
  @Auth()
  @DocsVerify()
  verify(@GetUser() user: UserWithoutWithRoleResponse) {
    return this.authService.verify(user);
  }
}
