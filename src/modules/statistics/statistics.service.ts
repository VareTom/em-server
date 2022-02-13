import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EXPENDITURE_REPOSITORY } from 'src/core/constants';

// Entities
import { Expenditure } from 'src/core/entities/expenditure.entity';

// DTOs
import { StatisticsOutputDto } from 'src/core/dtos/dashboard/statisticsOutputDto';

@Injectable()
export class StatisticsService {
  
  constructor(
    @Inject(EXPENDITURE_REPOSITORY)
    private expenditureRepository: typeof Expenditure
  ) {}
  
  async getForEntity(entityUuid: string): Promise<StatisticsOutputDto> {
    const totalExpendituresInCent = await this.expenditureRepository.sum('priceInCent',{
      where: {entityUuid: entityUuid}
    })
    if (!totalExpendituresInCent) throw new HttpException('Cannot retrieve the total of expenditures.', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return new StatisticsOutputDto({
      benefits: 0 - totalExpendituresInCent,
      totalIncomes: 0,
      actualIncomes: 0,
      totalExpendituresInCent: totalExpendituresInCent
    })
  }
  
}
