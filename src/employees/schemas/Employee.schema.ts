import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EmployeeStatus, EmployeeTier } from "../Employee.enum";

/*export interface Employee{
    id:String,
    firstName:String,
    lastName:String,
    designation:String,
    nearestCity:String,
    tier:EmployeeTier,
    status:EmployeeStatus
}
*/ 
export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee{
    @Prop()
    firstName:string
    @Prop({required:true})
    lastName:string
    @Prop({required:true})
    designation:string
    @Prop()
    nearestCity:string
    @Prop()
    tier:EmployeeTier
    @Prop()
    status:EmployeeStatus
   
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
