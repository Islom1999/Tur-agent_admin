import { IPackage } from "./package";
import { IRegion } from "./region";

export interface IAccomidation {
    id?: string;   
    night: number; 
    hotel_en: string;
    hotel_ru: string;
    hotel_ne: string;
    hotel_id: string;

    package?: IPackage;
    package_id: string;
    region?: IRegion;
    region_id?: string;
}