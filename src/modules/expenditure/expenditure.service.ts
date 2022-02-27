import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EXPENDITURE_REPOSITORY } from 'src/core/constants';

// Entities
import { Expenditure } from 'src/core/entities/expenditure.entity';

// DTOs
import { ExpenditureCreateInputDto } from 'src/core/dtos/expenditure/expenditureCreateInputDto';
import { ExpenditureOutputDto } from 'src/core/dtos/expenditure/expenditureOutputDto';
import { ExpenditureUpdateInputDto } from 'src/core/dtos/expenditure/expenditureUpdateInputDto';

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
  
  async getAllForEntity(entityUuid: string): Promise<ExpenditureOutputDto[]> {
    const expenditures = await this.expenditureRepository.findAll({
      where: { entityUuid: entityUuid }
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
