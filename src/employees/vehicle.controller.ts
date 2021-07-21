import { Body } from "@nestjs/common";
import { Controller, Get, Post } from "@nestjs/common";
import { VehicleCreateDTO } from "./dto/VehicleCreate.dto";
import { Vehicle } from "./schemas/Vehicle.schema";
import { VehicleService } from "./service/Vehicle.service";

@Controller('vehicles')
export class VehicleController {
    constructor(private vehicleService:VehicleService){}
    
     @Post()
     async create(@Body() vehicleCreateDto:VehicleCreateDTO):Promise<Vehicle>{
         return await this.vehicleService.create(vehicleCreateDto);
     }
     @Get()
     async getAll(){
         return this.vehicleService.getAll();
     }
}