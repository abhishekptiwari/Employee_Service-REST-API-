import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { EmployeeStatus, EmployeeTier } from '../Employee.enum';
import {v1 as uuid} from 'uuid';
import { EmployeeSearchDto } from '../dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from '../dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from '../dto/EmployeeCreate.dto';
import { NotFoundError } from 'rxjs';
import { Employee } from '../schemas/Employee.schema';
import { EmployeeRepository } from '../repository/Employee.repository';
import {Response} from 'express';


@Injectable()
export class EmployeesService {
    async getEmployeeById(id: string) {
       return await this.employeeRepository.getEmployeebyId(id)
    }
    // updateEmployee(employeeUpdateDto: EmployeeUpdateDto) {
    //     throw new Error('Method not implemented.');
    // }
    // deleteEmployee(id: string) {
    //     throw new Error('Method not implemented.');
    // }
    // private employees : Employee [] =[]
    constructor(private employeeRepository:EmployeeRepository){

    }

    async getAllEmployees(): Promise<Employee[]> {
         return await this.employeeRepository.findAll();
        //return  this.employees;
    }

     // Find Employee By Name or Status.
     employeeSearch(employeeSearchDto: EmployeeSearchDto){
        // let employees = this.getAllEmployees();
        // if(status){
        //     employees = employees.filter(employee => employee.status === status);
        // }
        // if(name){
        //     employees=employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name))
        // }
        // return employees;
        return this.employeeRepository.FindByNameOrStatus(employeeSearchDto)
    }

    // Delete the employee by ID
    async deleteEmployeeById(id: string): Promise<Employee> {
        return await this.employeeRepository.DeleteOne(id);
    }

    async createEmployee(employeeCreateDto:EmployeeCreateDto):Promise<Employee> {
        return await this.employeeRepository.create(employeeCreateDto);
    }

    async updateEmployeeById(@Res() res: Response, id: string, employeeUpdateDto:EmployeeUpdateDto):Promise<Employee> {
        return await this.employeeRepository.updateEmployeeById(res, id, employeeUpdateDto);
    }

//Commented  code

//     employeeSearch(employeeSearchDto:EmployeeSearchDto){
       
//         const {status,name}=employeeSearchDto;
//         let employees=this.getAllEmployees();

//         if(status){
//             employees=employees.filter(employee=>employee.status === status);
//         }
//         if(name){
//             employees=employees.filter(employee=>employee.firstName.includes(name) || employee.lastName.includes(name));
            
//         }
//         return employees;
//     }
//     getEmployeeById(id:string):Employee{
//         const employees= this.getAllEmployees();
//         let employee=employees.find(employee=>employee.id===id)
//         if(!employee){
//             throw new NotFoundException(`${id} is not exist.`)
//         }
//         return employee;
//     }

//     updateEmployee(employeeUpdatedto:EmployeeUpdateDto):Employee{
//         const {id ,city}=employeeUpdatedto;
//         let employee =this.getEmployeeById(id);
//         employee.nearestCity=city;
//         return employee;

//     }
//     deleteEmployee(id:string):boolean{
//         let employees=this.getAllEmployees();
//         this.employees = employees.filter(employee=>employee.id != id)
//         return (employees.length != this.employees.length)
//     }
}
