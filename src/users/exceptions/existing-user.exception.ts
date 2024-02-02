export class ExistingUserException extends Error {
  email: string;

  constructor(email: string, message: string | undefined) {
    super(message);
    this.email = email;
  }
}
