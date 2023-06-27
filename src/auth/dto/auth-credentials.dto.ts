import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthCredentials {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
