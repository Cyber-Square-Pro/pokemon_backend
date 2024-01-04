import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super();
    }

    validate(apiKey: string): Promise<boolean> {
        // Replace this with your logic to validate the API key
        const validApiKeys = process.env.API_KEY;
        const isValid = validApiKeys.includes(apiKey);

        if (!isValid) {
            throw new UnauthorizedException('Invalid API key');
        }

        return Promise.resolve(true);
    }
}
