import { Injectable, Res } from "@nestjs/common" ;
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmployeeCreateDto } from "../dto/EmployeeCreate.dto";
import { EmployeeSearchDto } from "../dto/EmployeeSearch.dto";
import { EmployeeUpdateDto } from "../dto/EmployeeUpdate.dto";
import { Employee, EmployeeDocument } from "../schemas/Employee.schema";
import {Response} from 'express';


@Injectable()
export class EmployeeRepository{
    constructor(@InjectModel(Employee.name) private employeeModel:Model<EmployeeDocument>){     }

        async create(createEmployeeDTO: EmployeeCreateDto): Promise<Employee> {

            let newEmployee = new this.employeeModel(createEmployeeDTO);
            return await newEmployee.save()
        }

        async findAll():Promise<Employee[]>{
            return await this.employeeModel.find(); 
        }

        async updateEmployeeById(@Res() res: Response, id: string, employeeUpdateDto: EmployeeUpdateDto): Promise<any>{
            // var conditions = {
            //     _id : id 
            // }
            // const employee = await this.employeeModel.findById(id)
            // var updatedEmployee = {

            //     firstName: employeeUpdateDto.firstName === undefined ? employee.firstName : employeeUpdateDto.firstName,
            //     lastName: employeeUpdateDto.lastName === undefined ? employee.lastName : employeeUpdateDto.lastName,
            //     nearestCity: employeeUpdateDto.nearestCity === undefined ? employee.nearestCity : employeeUpdateDto.nearestCity,
            //     designation: employeeUpdateDto.designation === undefined ? employee.designation : employeeUpdateDto.designation,
            //     tier: employeeUpdateDto.tier === undefined ? employee.tier : employeeUpdateDto.tier,
            //     status: employeeUpdateDto.status === undefined ? employee.status : employeeUpdateDto.status,
            // }
            // await this.employeeModel.findOneAndUpdate(conditions, updatedEmployee)
            // return updatedEmployee;
            const user = await this.employeeModel.findByIdAndUpdate(id, employeeUpdateDto);
            // const user = await this.employeeModel.findOneAndUpdate(id, employeeUpdateDto);

            return res.json({
                success: true,
                data: "profile updated",
            });
        }


        async FindByNameOrStatus(employeeSearchDto: EmployeeSearchDto): Promise<Employee[]> {
            const {status, name} = employeeSearchDto;
            console.log(status, name);
            if(name && status){ 
                const allEmployees = await this.employeeModel.aggregate([
                    {
                        "$match": {
                            $and: [
                                {$or:[{ firstName: name },
                                     { lastName: name }]
                                },
                                { status: status },      
                            ]
                        }
                    }
                ]);
                return allEmployees;
            }else{
                const allEmployees = await this.employeeModel.aggregate([
                    {
                        "$match": {
                            $or: [
                                { status: status },
                                { firstName: name },
                                { lastName: name }
                            ]
                        }
                    }
                ]);
                return allEmployees;
            }
        }
        async getEmployeebyId(id:string): Promise<Employee>{
           return await this.employeeModel.findById(id);
        }

        async DeleteOne(id: string): Promise<Employee> {
            return await this.employeeModel.findOneAndDelete({_id: id});
        }


    
}