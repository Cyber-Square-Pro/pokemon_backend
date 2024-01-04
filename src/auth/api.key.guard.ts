// api-key.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['api-key']; // Assuming the API key is passed in the 'api-key' header

        // Replace this with your logic to validate the API key
        const validApiKeys = [process.env.API_KEY];
        const isValid = validApiKeys.includes(apiKey);

        return isValid;
    }
}
