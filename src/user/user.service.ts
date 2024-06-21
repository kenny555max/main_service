import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/database/entities/auth.entities';
import { VerificationStatusEnum } from 'src/database/interfaces/authI';
import { ErrorHandler } from 'src/utils/error-manager';
import { PasswordManager } from 'src/utils/password-manager';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async findOneUser(email: string): Promise<AuthEntity | undefined> {
    const user = await this.authRepository.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }

    return user;
  }

  async change_password(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    try {
      const user = await this.findOneUser(email);

      if (!user) {
        throw new NotFoundException('user not found');
      }

      const checkIfOldPassword = await PasswordManager.matchingPasswords(
        password,
        user.password,
      );

      if (checkIfOldPassword) {
        throw new UnauthorizedException('You cannot enter old password');
      }

      const hashPassword = await PasswordManager.hashPassword(password);

      const updated = await this.authRepository.update(user.id, {
        password: hashPassword,
      });

      console.log(updated);

      return {
        message: 'Password changed successfully. Proceed to login.',
      };
    } catch (error) {
      ErrorHandler.handleError('ResetPassword.error', error);
    }
  }

  async findOneUserId(userId: number): Promise<AuthEntity | undefined> {
    const user = await this.authRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }

    return user;
  }

  async findAllUser(): Promise<AuthEntity[] | undefined> {
    return await this.authRepository.find();
  }

  async userIsVerified(email: string): Promise<boolean> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user.verificationStatus === 'verified') {
      return true;
    }

    return false;
  }

  async updateUserVerificationStatus(email: string): Promise<AuthEntity> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.verificationStatus = VerificationStatusEnum.VERIFIED;

    return await this.authRepository.save(user);
  }
}
