import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './service/employees.service';
import { EmployeeRepository } from './repository/Employee.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/Employee.schema';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './service/Vehicle.service';
import { VehicleRepository } from './repository/vehicle.repository';
import { Vehicle, VehicleSchema } from './schemas/Vehicle.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Employee.name,schema:EmployeeSchema },{name:Vehicle.name,schema:VehicleSchema}])],
  controllers: [EmployeesController, VehicleController],
  providers: [EmployeesService, EmployeeRepository, VehicleService, VehicleRepository]
})
export class EmployeesModule {}
