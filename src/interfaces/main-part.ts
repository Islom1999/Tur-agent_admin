import { IBaseModel } from "./base-model";

export interface IMainPart extends IBaseModel{
    image:string;
    subCount?: 0,
    partCount?: 0,
    subPercentage?: null,
    partPercentage?: null
}