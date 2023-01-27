import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import * as path from 'path';

const BD = `mongodb+srv://nikita:12345678Ff@cluster0.0j7ajnz.mongodb.net/?retryWrites=true&w=majority`;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(BD),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
