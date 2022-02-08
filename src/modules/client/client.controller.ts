import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// DTOs


// Services
import { ClientService } from 'src/modules/client/client.service';

@ApiTags('clients')
@Controller('clients')
export class ClientController {

  constructor(private readonly clientService: ClientService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() client: any): Promise<any> {
    return await this.clientService.create(client);
  }

}
