import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EXPENDITURE_REPOSITORY, DATE_REFERENCE } from 'src/core/constants';
import { Op } from 'sequelize';

// Entities
import { Expenditure } from 'src/core/entities/expenditure.entity';

// DTOs
import { ExpenditureCreateInputDto } from 'src/core/dtos/expenditure/expenditureCreateInputDto';
import { ExpenditureOutputDto } from 'src/core/dtos/expenditure/expenditureOutputDto';
import { ExpenditureUpdateInputDto } from 'src/core/dtos/expenditure/expenditureUpdateInputDto';

// Enums
import { FiltersPeriodEnum } from 'src/core/enums/filters-period.enum';

@Injectable()
export class ExpenditureService {
  
  constructor(
    @Inject(EXPENDITURE_REPOSITORY)
    private expenditureRepository: typeof Expenditure
  ) {}
  
  async create(expenditureInput: ExpenditureCreateInputDto): Promise<ExpenditureOutputDto> {
    const expenditure = await this.expenditureRepository.create(expenditureInput);
    if (!expenditure) throw new HttpException('Cannot create expenditure.', HttpStatus.BAD_REQUEST)
    
    return new ExpenditureOutputDto(expenditure);
  }
  
  async getAllForEntity(entityUuid: string, period: FiltersPeriodEnum): Promise<ExpenditureOutputDto[]> {
    let periodClause;
    if (period === FiltersPeriodEnum.ALL_TIME) periodClause = DATE_REFERENCE;
    if (period === FiltersPeriodEnum.MONTHLY) {
      const date = new Date(), y = date.getFullYear(), m = date.getMonth();
      periodClause = new Date(y, m, 2);
    }
    
    const expenditures = await this.expenditureRepository.findAll({
      where: {
        entityUuid: entityUuid,
        createdAt: {[Op.gte]: periodClause}
      }
    })
    if (expenditures.length < 0) throw new HttpException('Cannot retrieve all expenditures for this entity', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return expenditures.map(expenditure => new ExpenditureOutputDto(expenditure));
  }
  
  async delete(expenditureUuid: string): Promise<ExpenditureOutputDto> {
    const expenditure = await this.expenditureRepository.findByPk(expenditureUuid);
    if (!expenditure) throw new HttpException('Cannot find this expenditure', HttpStatus.BAD_REQUEST);
    
    await expenditure.destroy();
    
    return new ExpenditureOutputDto(expenditure);
  }
  
  async update(expenditureUuid: string, expenditureUpdateInput: ExpenditureUpdateInputDto): Promise<ExpenditureOutputDto> {
    const expenditure = await this.expenditureRepository.findByPk(expenditureUuid);
    if (!expenditure) throw new HttpException('Cannot find this expenditure', HttpStatus.BAD_REQUEST);
    
    if (expenditure.name !== expenditureUpdateInput.name) expenditure.name = expenditureUpdateInput.name;
    if (expenditure.priceInCent !== expenditureUpdateInput.priceInCent) expenditure.priceInCent = expenditureUpdateInput.priceInCent;
    if (expenditure.boughtAt !== expenditureUpdateInput.boughtAt) expenditure.boughtAt = expenditureUpdateInput.boughtAt;
  
    await expenditure.save();
    
    return new ExpenditureOutputDto(expenditure);
  }
}
