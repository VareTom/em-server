import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

// Constants
import { EXPENDITURE_REPOSITORY, ORDER_REPOSITORY } from 'src/core/constants';

// Entities
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { Order } from 'src/core/entities/order.entity';

// DTOs
import { StatisticsOutputDto } from 'src/core/dtos/dashboard/statisticsOutputDto';

@Injectable()
export class StatisticsService {
  
  constructor(
    @Inject(EXPENDITURE_REPOSITORY)
    private expenditureRepository: typeof Expenditure,
    @Inject(ORDER_REPOSITORY)
    private orderRepository: typeof Order,
  ) {}
  
  async getForEntity(entityUuid: string): Promise<StatisticsOutputDto> {
    const totalExpendituresInCent = await this.expenditureRepository.sum('priceInCent',{
      where: {entityUuid: entityUuid}
    })
    if (!totalExpendituresInCent) throw new HttpException('Cannot retrieve the total of expenditures.', HttpStatus.INTERNAL_SERVER_ERROR);
    
    const totalIncomes = await this.orderRepository.sum('totalInCent');
    if (totalIncomes < 0) throw new HttpException('Total incomes cannot be negative', HttpStatus.INTERNAL_SERVER_ERROR);
    
    const actualIncomes = await this.orderRepository.sum('totalInCent', {
      where: { validatedAt: { [Op.not]: null } }
    })
    if (actualIncomes < 0) throw new HttpException('Actual incomes cannot be negative', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return new StatisticsOutputDto({
      benefits: actualIncomes - totalExpendituresInCent,
      totalIncomes: totalIncomes,
      actualIncomes: actualIncomes,
      totalExpendituresInCent: totalExpendituresInCent
    })
  }
  
}
