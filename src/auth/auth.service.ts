import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterDTO } from 'src/database/dtos/auth.dto';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/database/entities/auth.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '../interfaces';
import { PasswordManager } from 'src/utils/password-manager';
import { MailService } from 'src/mail/mail.service';
import { ErrorHandler } from 'src/utils/enhanced-error-manager';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private mailService: MailService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async register(body: AuthRegisterDTO): Promise<void> {
    const { email, password, firstName, lastName, accountType } = body;

    await this.checkIfUserExist(email);

    const hashPassword = await PasswordManager.hashPassword(password);

    const user = this.authRepository.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      accountType,
    });

    await this.authRepository.save(user);

    const token = await this.generateVerificationToken({
      email: user.email,
      sub: user.id,
    });

    const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email/${token}`;

    const message = `<b>Kindly click <a href=${verificationUrl}>here</a> to verify you are the owner of this email. Thanks.</b>`;

    const subject = 'Email verification';

    //await this.sendVerificationEmail(user.email, message, subject);

    this.mailService.send_mail_notification(email, subject, message);

    throw new HttpException(
      { message: 'Registeration successful', data: user },
      200,
    );
  }

  private async checkIfUserExist(email: string): Promise<void> {
    const existingUser = await this.userService.findOneUser(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  }

  async generateVerificationToken(payload: {
    email: string;
    sub: number;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.verification_token_secret'),
      expiresIn: this.configService.get('jwt.verification_token_expires'),
    });
  }

  async sendVerificationEmail(
    email: string,
    message: string,
    subject: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'oyedepokehinde2016@gmail.com',
        pass: 'gcvrogbcgjkgxbnx',
      },
    });

    const info = await transporter.sendMail({
      from: 'oyedepokehinde2016@gmail.com', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: 'Kindly', // plain text body
      html: `${message}`,
    });

    console.log('Message sent: %s', info.messageId);
  }

  async resend_verification_token(email: string): Promise<{ message: string }> {
    try {
      const user = await this.userService.findOneUser(email);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (await this.userService.userIsVerified(user.email)) {
        throw new ConflictException('user already verified');
      }

      const token = await this.generateVerificationToken({
        email: user.email,
        sub: user.id,
      });

      const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email/${token}`;

      const message = `<b>Kindly click <a href=${verificationUrl}>here</a> to verify you are the owner of this email. Thanks.</b>`;

      const subject = 'Email verification - resend';

      await this.sendVerificationEmail(user.email, message, subject);

      return {
        message: 'Verification link resent',
      };
    } catch (error) {
      ErrorHandler.handleError('Auth.service.resend_verification_token', error);
    }
  }

  async email_verification(
    verificationToken: string,
  ): Promise<{ message: string; user: any } | undefined> {
    //try {
    if (!verificationToken) {
      throw new BadRequestException('Invalid token');
    }

    const payload = await this.jwtService.verifyAsync(verificationToken, {
      secret: this.configService.get('jwt.verification_token_secret'),
    });

    console.log('got here?');

    if (!payload) {
      throw new UnauthorizedException('token malformed');
    }

    const { email } = payload;

    if (await this.userService.userIsVerified(email)) {
      throw new ConflictException('user already verified');
    }

    const { password, ...rest } =
      await this.userService.updateUserVerificationStatus(email);

    console.log(password);

    return { message: 'Email verification successful', user: rest };
    //} catch (error) {
    //  ErrorHandler.handleError('Auth.email-verification', error);
    //}
  }

  async validateUser(
    email: string,
    user_password: string,
  ): Promise<any | undefined> {
    //try {
    const user = await this.userService.findOneUser(email);

    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const decrypt_password = await PasswordManager.matchingPasswords(
      user_password,
      user.password,
    );

    const userIsVerified = await this.userService.userIsVerified(email);

    if (!userIsVerified) {
      throw new ConflictException('you are not verified yet');
    }

    if (!decrypt_password) {
      throw new BadRequestException('Incorrect credentials');
    }

    return user;
    //} catch (error) {
    //  console.log(error);
    //  ErrorHandler.handleError('Auth.user.error', error);
    //}
  }

  async login(
    user: AuthEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: parseInt(user.phoneNo),
    };

    const tokens = await this.getTokens(payload);

    console.log(user.id);

    await this.updateAccountTokens(
      user.id,
      tokens.accessToken,
      tokens.refreshToken,
    );

    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshTokens(
    refresh_token: string,
  ): Promise<{ access_token: string }> {
    try {
      if (!refresh_token) {
        throw new ForbiddenException('Access Denied');
      }

      const data = this.jwtService.verify(refresh_token, {
        secret: this.configService.get('jwt.refresh_token_secret'),
        ignoreExpiration: false,
      });

      console.log(data);

      if (!data) throw new ForbiddenException('Access Denied');

      const user = await this.userService.findOneUserId(data.id);
      console.log(user);
      if (!user) throw new ForbiddenException('Access Denied');

      const jwtPayload = {
        id: user.id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return {
        access_token: await this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.get('jwt.access_token_secret'),
          expiresIn: this.configService.get('jwt.access_token_expires'),
        }),
      };
    } catch (error) {
      ErrorHandler.handleError('AuthService.refreshTokens', error);
    }
  }

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt.access_token_secret'),
        expiresIn: this.configService.get('jwt.access_token_expires'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('jwt.refresh_token_secret'),
        expiresIn: this.configService.get('jwt.refresh_token_expires'),
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateAccountTokens(
    userId: number,
    rt: string,
    at: string,
  ): Promise<void> {
    const update = await this.authRepository.update(userId, {
      accessToken: at,
      refreshToken: rt,
    });

    console.log('update', update);
  }
}
