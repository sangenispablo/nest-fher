/* eslint-disable prettier/prettier */
import { IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: `Deberia venir un brand como string` })
  readonly brand: string;
  @IsString()
  @MinLength(3, {
    message: 'El model tiene que tener al menos 3 o mas caracteres',
  })
  readonly model: string;
}
