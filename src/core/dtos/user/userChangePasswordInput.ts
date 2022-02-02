import { IsNotEmpty } from 'class-validator';

export class UserChangePasswordInput {
  @IsNotEmpty()
  old: string;
  
  @IsNotEmpty()
  new: string;
}