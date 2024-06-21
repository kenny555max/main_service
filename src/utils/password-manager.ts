import * as bcrypt from 'bcrypt';

export class PasswordManager {
  static async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static async matchingPasswords(
    incomingPassword: string,
    currentPassword: string,
  ) {
    const matching = await bcrypt.compare(incomingPassword, currentPassword);
    return matching;
  }
}
