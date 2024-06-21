import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from 'src/database/dtos/auth.dto';
import { AuthEntity } from 'src/database/entities/auth.entities';
import { UserService } from 'src/user/user.service';
import { Public } from './custom_deco';
import { LocalAuthGuard } from '../guards/local_auth.gaurd';
import { RtGuard } from '../guards/rt-guard';
import { UserInterceptors } from '../interceptors/user-interceptors';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  async register(@Body() body: AuthRegisterDTO): Promise<void> {
    return this.authService.register(body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(UserInterceptors)
  @Post('login')
  async login(
    @Request() req: any,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    return await this.authService.login(req.user);
  }

  @Public()
  @Get('/verify-email/:token')
  async email_verification(
    @Param('token') token: string,
  ): Promise<{ message: string; user: AuthEntity } | undefined> {
    return await this.authService.email_verification(token);
  }

  @Public()
  @Post('resend-verification-link')
  async resend_verification_link(@Body() body: { email: string }) {
    return this.authService.resend_verification_token(body.email);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @Body() payload: { refresh_token: string },
  ): Promise<{ access_token: string }> {
    return this.authService.refreshTokens(payload.refresh_token);
  }

  @UseInterceptors(UserInterceptors)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<string | any> {
    return await this.userService.findOneUser(req.user.email);
  }
}
