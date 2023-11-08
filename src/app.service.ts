import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  homeRoute(): string {
    return 'Welcome to Team B Pokemon API!';
  }
}
