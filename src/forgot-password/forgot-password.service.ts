import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { ErrorHandler } from 'src/utils/error-manager';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async reset_password_verification_link(payload: {
    email: string;
  }): Promise<{ message: string }> {
    try {
      const user = await this.userService.findOneUser(payload.email);

      if (!user) {
        throw new NotFoundException('user with this email not found');
      }

      const token = await this.authService.generateVerificationToken({
        email: user.email,
        sub: user.id,
      });

      const verificationUrl = `http://localhost:3000/api/v1/forgot-password-email-verification/${token}`;

      const message = `<b>Kindly click <a href=${verificationUrl}>here</a> to reset your password. Thanks.</b>`;

      const subject = 'Forgot Password';

      await this.authService.sendVerificationEmail(
        user.email,
        message,
        subject,
      );

      return {
        message: 'Verification email sent successfully',
      };
    } catch (error) {
      ErrorHandler.handleError('ForgotPassword.reset_password.error', error);
    }
  }

  async confirm_email(email: string): Promise<{ message: string }> {
    const user = this.userService.findOneUser(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return {
      message: 'email confirmed. proceed to reset password',
    };
  }

  async reset_password(
    email: string,
    new_password: string,
  ): Promise<{ message: string }> {
    return this.userService.change_password(email, new_password);
  }
}
