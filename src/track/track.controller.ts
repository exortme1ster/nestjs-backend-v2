import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Post('/create-track')
	@UseInterceptors(FileInterceptor('picture'))
	create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateTrackDto,
	) {
		console.log(file);
		return this.trackService.create(dto, file);
	}

	@Get('/get-all')
	getAll(@Query('count') count: number, @Query('offset') offset: number) {
		return this.trackService.getAll(count, offset);
	}

	@Get('/get-one/:id')
	getOne(@Param('id') id: ObjectId) {
		return this.trackService.getOne(id);
	}

	@Delete('/delete/:id')
	delete(@Param('id') id: ObjectId) {
		return this.trackService.delete(id);
	}

	@Post('/add-comment')
	addComment(@Body() dto: CreateCommentDto) {
		return this.trackService.addComment(dto);
	}
}
