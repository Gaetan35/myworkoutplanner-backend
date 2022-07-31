import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class IdGeneratorService {
  public new() {
    return uuid.v4();
  }
}
