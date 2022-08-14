import { Controller, Get, Query } from '@nestjs/common';
import { GetSessionPropositionDTO } from './types/get-session-proposition.dto';
import { SessionService } from './session.service';

@Controller('api/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('/proposition')
  getSessionProposition(@Query() queryParams: GetSessionPropositionDTO) {
    return this.sessionService.getSessionProposition(queryParams);
  }
}
