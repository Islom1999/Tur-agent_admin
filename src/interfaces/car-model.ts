import { IBaseModel } from './base-model';
import { ICarMaker } from './car-maker';

export interface ICarModel extends IBaseModel {
    car_maker_id: string;
    car_maker?: ICarMaker;
    specCount?:0;
    percentage?:0;
}
