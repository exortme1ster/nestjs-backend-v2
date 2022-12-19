import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
	IMAGE = 'image',
}

@Injectable()
export class FileService {
	async createFile(
		type: FileType,
		file: Express.Multer.File,
	): Promise<string> {
		try {
			/* Creating a unique file name and a file path. */
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '..', 'static', type);

			/* Creating a folder if it doesn't exist and then writing the file to the folder. */
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
			return type + '/' + fileName;
		} catch (err) {
			throw new HttpException(
				err.message,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	removeFile(fileName: string) {}
}
