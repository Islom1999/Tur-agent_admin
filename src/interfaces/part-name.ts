import { IBaseModel } from './base-model';
import { ISubPart } from './sub-part';

export interface IPartName extends IBaseModel {
    sub_part_id: string;
    sub_part?: ISubPart;
}
