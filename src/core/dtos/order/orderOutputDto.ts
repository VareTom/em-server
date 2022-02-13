export class OrderOutputDto {
  uuid: string;
  durationInMinute?: number;
  performedAt?: Date;
  validatedAt?: Date;
  servicesUuid: string[];
  clientUuid: string;
  
  constructor(json: any) {
  }
}