import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// const Strategy = require('passport-mock-strategy');
import { Strategy } from 'passport-mock-strategy';

@Injectable()
export class MockStrategy extends PassportStrategy(Strategy) {
  validate(): boolean {
    return true;
  }
}
