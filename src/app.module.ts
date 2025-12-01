import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d4ml5ma4d50c73eop9p0-a',      // Render host
      port: 5432,
      username: 'staycation_db_9qyz_user',     // Render user
      password: '8jpPGoG4tjv3XYF1UjLxmvcOqJFgezuD',          // paste your password
      database: 'staycation_db_9qyz',          // Render DB name
      autoLoadEntities: true,
      synchronize: true,

      // ⭐ Required for Render PostgreSQL
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    UsersModule,
    PropertiesModule,
    BookingsModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
