import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() client: any): Promise<any> {
    return await this.clientService.create(client);
  }

}
