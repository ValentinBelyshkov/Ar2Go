import { IsIn, IsNumber, IsNumberString } from 'class-validator';

export class UpdateQuestDto {
  @IsNumberString()
  @IsIn(['1', '2', '3', '4', '5', '6', '7'])
  pointId: '1' | '2' | '3' | '4' | '5' | '6' | '7';

  @IsNumber()
  hearts: number;

  @IsNumber()
  stars: number;
}
