import { ICountry } from "./country";

export interface IRegion {
    id?: string;
    images: string[];
    country_id: string;
    map: string;
    name_en: string;
    name_ru: string;
    name_ne: string;
    name_id: string;
    description_en: string;
    description_ru: string;
    description_ne: string;
    description_id: string;

    country?: ICountry;
}
