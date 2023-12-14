import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  homeRoute(): string {
    return `
    <center>
    <h1>Welcome to Pokedex API of Team B</h1>
    
    </center>
    `;
  }
}
