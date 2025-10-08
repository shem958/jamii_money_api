import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GoalsModule } from './goals/goals.module';
import { ChamasModule } from './chamas/chamas.module';
import { NudgesModule } from './nudges/nudges.module';
import { ChamaMembersModule } from './chama-members/chama-members.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load .env into process.env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Use async config to inject Mongo URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    UsersModule,
    WalletsModule,
    TransactionsModule,
    GoalsModule,
    ChamasModule,
    NudgesModule,
    ChamaMembersModule,
    AuthModule,
  ],
})
export class AppModule { }
