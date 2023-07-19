import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthCredentials {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
