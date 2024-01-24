import { Injectable } from "@nestjs/common";
import { GoogleConfig } from "./google.entity";
import { ConfigService } from '@nestjs/config';
       
@Injectable()
export class GoogleService {
    constructor(private configService: ConfigService) {}

    getClientID(): Promise<GoogleConfig> {
        return Promise.resolve({ clientID: this.configService.get<string>('GOOGLE_CLIENT_ID') });
    }
}