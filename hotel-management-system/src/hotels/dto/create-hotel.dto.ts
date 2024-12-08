import { IsEmail, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  webLink?: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1)
  status: number;

  @ApiProperty()
  @IsNotEmpty()
  coordinate: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;
}