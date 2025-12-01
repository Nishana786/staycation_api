import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsNumber()
  bedrooms: number;

  @IsString()
  image: string;
}
