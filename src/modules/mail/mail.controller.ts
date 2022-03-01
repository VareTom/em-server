import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// Services
import { MailService } from 'src/modules/mail/mail.service';

// DTOs
import { ContactMailInputDto } from 'src/core/dtos/mail/ContactMailInputDto';

@ApiTags('mails')
@Controller('mails')
@UseInterceptors(ClassSerializerInterceptor)
export class MailController {
  constructor(private readonly mailService: MailService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: Boolean
  })
  @Post('/contact')
  async contact(@Body() contactMailInput: ContactMailInputDto): Promise<Boolean> {
    return await this.mailService.contact(contactMailInput);
  }
  
}
