import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { fn, Op } from 'sequelize';

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
    const currentYear = new Date().getFullYear();
    
    let totalExpendituresInCent = await this.expenditureRepository.sum('priceInCent',{
      where: {entityUuid: entityUuid}
    })
    if (!totalExpendituresInCent) totalExpendituresInCent = 0;
    
    const totalIncomes = await this.orderRepository.sum('totalInCent');
    if (totalIncomes < 0) throw new HttpException('Total incomes cannot be negative', HttpStatus.INTERNAL_SERVER_ERROR);
  
    /**
     * select SUM(O.totalInCent) - SUM(Ex.priceInCent) as benefits , MONTH(Ex.createdAt)
     * from Entities En
     * JOIN Expenditures Ex on En.uuid = Ex.entityUuid
     * JOIN Orders O on En.uuid = O.entityUuid
     * where En.uuid = '5d947763-b1cb-4a3a-b9fe-dd9beac89ea6'
     * group by month(Ex.createdAt)
     */
    const actualIncomesByMonths = await this.orderRepository.sum('totalInCent', {
      where: { validatedAt: { [Op.not]: null } }
    })
    if (actualIncomesByMonths < 0) throw new HttpException('Actual incomes by month cannot be negative', HttpStatus.INTERNAL_SERVER_ERROR);
    
    const actualIncomes = await this.orderRepository.sum('totalInCent', {
      where: { validatedAt: { [Op.not]: null } }
    })
    if (actualIncomes < 0) throw new HttpException('Actual incomes cannot be negative', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return new StatisticsOutputDto({
      benefits: actualIncomes - totalExpendituresInCent,
      totalIncomes: totalIncomes ?? 0,
      actualIncomes: actualIncomes ?? 0,
      totalExpendituresInCent: totalExpendituresInCent
    })
  }
  
}
