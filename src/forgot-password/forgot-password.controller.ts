import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/custom_deco';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('/api/v1/')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Public()
  @Post('forgot-password')
  async forgot_password(
    @Body() payload: { email: string },
  ): Promise<{ message: string }> {
    return this.forgotPasswordService.reset_password_verification_link(payload);
  }

  @Post('/forgot-password-email-verification/:token')
  async confirm_password_reset_email(
    @Body() payload: { email: string },
  ): Promise<{ message: string }> {
    return this.forgotPasswordService.confirm_email(payload.email);
  }

  @Post('/reset-password')
  async reset_password(
    @Body() payload: { email: string; new_password: string },
  ): Promise<{ message: string }> {
    return this.forgotPasswordService.reset_password(
      payload.email,
      payload.new_password,
    );
  }
}
