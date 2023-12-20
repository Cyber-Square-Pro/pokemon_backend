import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  homeRoute(): string {
    return `
    <center>
    <h1>Welcome to Pokedex API of Team B</h1>
    
    // GET Endpoints
    <ul>
    <li>/users -> Get all users</li>
    <li>/pokemon -> Get all pokemons</li>
    </ul>
    </center>
    `;
  }
}
