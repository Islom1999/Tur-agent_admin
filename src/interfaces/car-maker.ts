import { Group } from 'src/enumerations';
import { IBaseModel } from './base-model';

export interface ICarMaker extends IBaseModel {
    group: Group;
    image: string;
    modelCount?: 0,
    specCount?: 0,
    modelPercentage?: null,
    specPercentage?: null
}
