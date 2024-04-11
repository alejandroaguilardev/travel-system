import { Module } from '@nestjs/common';
import { UbigeoQuery } from './ubigeo-query.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictModel, DistrictSchema } from './schema/district.schema';
import { DepartmentModel, DepartmentSchema } from './schema/department.schema';
import { ProvinceModel, ProvinceSchema } from './schema/province.schema';
import { MongoDepartmentRepository } from './persistence/mongo-department.repository';
import { MongoProvinceRepository } from './persistence/mongo-province.repository';
import { MongoDistrictRepository } from './persistence/mongo-district.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DistrictModel.name, schema: DistrictSchema },
    ]),
    MongooseModule.forFeature([
      { name: DepartmentModel.name, schema: DepartmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProvinceModel.name, schema: ProvinceSchema },
    ]),
  ],
  controllers: [],
  providers: [
    UbigeoQuery,
    MongoDepartmentRepository,
    MongoProvinceRepository,
    MongoDistrictRepository,
  ],
  exports: [
    UbigeoQuery,
    MongoDepartmentRepository,
    MongoProvinceRepository,
    MongoDistrictRepository,
  ],
})
export class UbigeoModule {}
