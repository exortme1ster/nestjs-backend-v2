import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		MongooseModule.forRoot(
			'mongodb+srv://admin:root@cluster0.inpsgq9.mongodb.net/music-platform',
		),
		AlbumModule,
		TrackModule,
		FileModule,
	],
	/* A way to register the services. */
	controllers: [],
	providers: [],
})
export class AppModule {}
