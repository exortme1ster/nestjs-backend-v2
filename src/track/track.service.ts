import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
		private fileService: FileService,
	) {}

	async create(
		dto: CreateTrackDto,
		file: Express.Multer.File,
	): Promise<Track> {
		const filePath = await this.fileService.createFile(
			FileType.IMAGE,
			file,
		);
		const track = await this.trackModel.create({
			...dto,
			listens: 0,
			picture: filePath,
		});
		return track;
	}

	async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
		const tracks = await this.trackModel
			.find()
			.skip(Number(offset))
			.limit(Number(count))
			.populate('comments');
		return tracks;
	}

	async getOne(id: ObjectId): Promise<Track> {
		const track = await this.trackModel.findById(id).populate('comments');
		return track;
	}

	async delete(id: ObjectId): Promise<Track> {
		const track = await this.trackModel.findByIdAndDelete(id);
		return track;
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		const track = await this.trackModel.findById(dto.trackId);
		const comment = await this.commentModel.create({ ...dto });
		track.comments.push(comment);
		await track.save();
		return comment;
	}
}
