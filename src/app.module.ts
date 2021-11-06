import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { EmployeesModule } from './employees/employees.module';


@Module({
  imports: 
  [MongooseModule.forRoot(MONGO_CONNECTION, {useFindAndModify: false}),EmployeesModule],
})
export class AppModule {
}
