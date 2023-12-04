import { IPackage } from "./package";

export interface IHighlight {
    id?: string;    
    info_en: string;
    info_ru: string;
    info_ne: string;
    info_id: string;

    package: IPackage;
    package_id: string;
}