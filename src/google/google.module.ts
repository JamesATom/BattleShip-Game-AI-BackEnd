import { Module } from '@nestjs/common';
import { GoogleResolver } from './google.resolver';
import { GoogleService } from './google.service';
 
@Module({
    imports: [],
    controllers: [],
    providers: [GoogleResolver, GoogleService],
})
export class GoogleModule {}
