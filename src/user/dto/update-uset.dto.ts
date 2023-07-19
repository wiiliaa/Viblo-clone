import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;
}
