import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModel, FolderSchema } from './schema/folder.schema';
import { MongoFolderRepository } from './persistence/mongo-folder.repository';
import { AuthModule } from '../../auth/infrastructure/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FolderModel.name, schema: FolderSchema },
    ]),
    AuthModule,
  ],
  controllers: [FoldersController],
  providers: [FoldersService, MongoFolderRepository],
  exports: [MongoFolderRepository],
})
export class FoldersModule {}
