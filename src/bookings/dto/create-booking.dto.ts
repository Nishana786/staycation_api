import { IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  propertyId: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
