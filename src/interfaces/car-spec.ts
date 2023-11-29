import { IBaseModel } from './base-model';
import { ICarModel } from './car-model';

export interface ICarSpec extends IBaseModel {
    car_model_id: number;
    car_model?: ICarModel;
}
