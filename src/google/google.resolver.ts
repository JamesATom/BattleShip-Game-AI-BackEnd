import { Resolver, Query } from '@nestjs/graphql';
import { GoogleService } from './google.service';
import { GoogleConfig } from './google.entity';

@Resolver(() => GoogleConfig)
export class GoogleResolver {
    constructor(private readonly googleService: GoogleService) {}

    @Query(() => GoogleConfig)
    async googleClientID(): Promise<GoogleConfig> {
        return this.googleService.getClientID();
    }
}