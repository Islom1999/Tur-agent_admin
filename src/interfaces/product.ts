import { FuelType } from 'src/enumerations';
import { IPartName } from './part-name';
import { ICarSpec } from './car-spec';

export interface IProduct {
    id?: number;
    price: number;
    fuel_type: FuelType;
    quantity: number;
    condition: string;
    part_number: string;
    delivery_cost: number;
    delivery_cost_not_included: boolean;
    part_name_id?: number;
    part_name?: IPartName;
    part_name_description?:string;
    car_spec_id?: number;
    car_spec: ICarSpec;
    images: string[];
}