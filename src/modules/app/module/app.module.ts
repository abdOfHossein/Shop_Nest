import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TypeOrmConfigService } from 'src/config/database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    })
    ,ConfigModule.forRoot({
    envFilePath:join(process.cwd(), `${process.env.NODE_ENV}.env`)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
