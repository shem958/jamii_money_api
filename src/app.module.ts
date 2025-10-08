import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 🧩 Modules
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GoalsModule } from './goals/goals.module';
import { ChamasModule } from './chamas/chamas.module';
import { NudgesModule } from './nudges/nudges.module';
import { ChamaMembersModule } from './chama-members/chama-members.module';
import { AuthModule } from './auth/auth.module';

// 🧠 Middleware
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Async MongoDB connection using ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    // Feature modules
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply request logging middleware globally
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
