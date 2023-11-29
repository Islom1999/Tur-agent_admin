import { IBaseModel } from './base-model';
import { IMainPart } from './main-part';

export interface ISubPart extends IBaseModel {
    main_part_id: string;
    main_part?: IMainPart;
    partCount?:number;
    percentage?:number;
}
