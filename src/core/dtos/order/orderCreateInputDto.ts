export class OrderCreateInputDto {
  durationInMinute?: number;
  performedAt?: Date;
  validatedAt?: Date;
  servicesUuid: string[];
  clientUuid: string;
}