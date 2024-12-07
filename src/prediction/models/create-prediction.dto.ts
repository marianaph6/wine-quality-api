import { IsNumber, IsDefined } from 'class-validator';

export class CreatePredictionDto {
  @IsDefined()
  @IsNumber()
  fixed_acidity: number;

  @IsDefined()
  @IsNumber()
  volatile_acidity: number;

  @IsDefined()
  @IsNumber()
  citric_acid: number;

  @IsDefined()
  @IsNumber()
  residual_sugar: number;

  @IsDefined()
  @IsNumber()
  chlorides: number;

  @IsDefined()
  @IsNumber()
  free_sulfur_dioxide: number;

  @IsDefined()
  @IsNumber()
  total_sulfur_dioxide: number;

  @IsDefined()
  @IsNumber()
  density: number;

  @IsDefined()
  @IsNumber()
  pH: number;

  @IsDefined()
  @IsNumber()
  sulphates: number;

  @IsDefined()
  @IsNumber()
  alcohol: number;
}
