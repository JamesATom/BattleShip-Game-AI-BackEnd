// app.module.ts
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PubSubModule } from './pubsub/pubsub.module';
import { PrismaModule } from './prismaDB/prisma.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GoogleModule } from './google/google.module';
import { BattleshipModule } from './games/battleship/battleship.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), '/src/schema.graphql'),
            playground: false,
            subscriptions: {
                'graphql-ws': true
            },
        }),
        PrismaModule,
        PubSubModule,
        GoogleModule,
        UserModule,
        BattleshipModule
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}

