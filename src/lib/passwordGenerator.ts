export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export class PasswordGenerator {
  private static readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly NUMBERS = '0123456789';
  private static readonly SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  static generate(options: PasswordOptions): string {
    let charset = '';
    let password = '';

    if (options.uppercase) charset += this.UPPERCASE;
    if (options.lowercase) charset += this.LOWERCASE;
    if (options.numbers) charset += this.NUMBERS;
    if (options.symbols) charset += this.SYMBOLS;

    if (charset.length === 0) {
      charset = this.LOWERCASE + this.NUMBERS;
    }

    const randomValues = new Uint32Array(options.length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < options.length; i++) {
      password += charset[randomValues[i] % charset.length];
    }

    return password;
  }
}
