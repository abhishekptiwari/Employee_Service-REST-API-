import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { first, NotFoundError } from 'rxjs';
import {EmployeesService} from './service/employees.service'
import { AllEmployeeSearchDto, EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto'
import { EmployeeTierValidationPipe } from 'src/employee-tier-validation.pipe';
import { EmployeeTier } from './Employee.enum';
import { Employee } from './schemas/Employee.schema';
import {Response} from 'express';

@Controller('employees')
export class EmployeesController {

    constructor(private employeeService:EmployeesService ){

    }

    // @Get()
    // @UsePipes(ValidationPipe)
    // async getAllemployee(@Query() param:EmployeeSearchDto):Promise<Employee[]>{
      
    //    if(Object.keys(param).length){
    //         return this.employeeService.employeeSearch(param)
    //     }else{
    //         return this.employeeService.getAllEmployees()
    //     }
    // //    return await this.employeeService.getAllEmployees();  
    // }
    @Get()
    @UsePipes(ValidationPipe)
    async getAllEmployees(@Query() param: EmployeeSearchDto | AllEmployeeSearchDto) {
       if(Object.keys(param).length) {
           console.log('with Paran');
           return this.employeeService.employeeSearch(param)
        }else{
           console.log('with no Paran');
           return this.employeeService.getAllEmployees();
       }
    }

    @Post() 
    @UsePipes(ValidationPipe)
    @UsePipes(new EmployeeTierValidationPipe)
    createEmployee(@Body() employeeCreateDto:EmployeeCreateDto):Promise<Employee>{

        return this.employeeService.createEmployee(employeeCreateDto);
    }
    
    @Get('/:id')
    getEmployeeById(@Param('id') id:string){
        return this.employeeService.getEmployeeById(id);
    }

    @Put('/:id')
    updateEmployee(@Res() res: Response,  @Param('id') id:string,@Body() employeeUpdateDto:EmployeeUpdateDto){
        
        return this.employeeService.updateEmployeeById(res, id, employeeUpdateDto);
    }
    
    @Delete('/delete/:id')
    deleteEmployeeById(@Param('id') id: string){
        return this.employeeService.deleteEmployeeById(id);
    }
}