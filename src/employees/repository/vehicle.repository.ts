import { Injectable } from "@nestjs/common";
import { Vehicle, VehicleDocument } from "../schemas/Vehicle.schema"
import { VehicleCreateDTO } from "../dto/VehicleCreate.dto"
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class VehicleRepository{


    constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>){    
    }

    async create(vehicleCreateDto: VehicleCreateDTO): Promise<Vehicle> {
        let newVehicle = new this.vehicleModel(vehicleCreateDto);
        return await newVehicle.save()
    }

    async findAll(){//:Promise<Vehicle[]>
        return await this.vehicleModel.find(); 
    }
}