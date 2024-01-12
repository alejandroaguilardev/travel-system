import { PartialType } from '@nestjs/swagger';
import { UserCreatorDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserCreatorDto) {}
