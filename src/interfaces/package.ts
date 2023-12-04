import { ICountry } from "./country";

export interface IPackage {
    id?: string;
    images: string[];

    name_en: string;
    name_ru: string;
    name_ne: string;
    name_id: string;

    description_en: string;
    description_ru: string;
    description_ne: string;
    description_id: string;

    notes_en: string;
    notes_ru: string;
    notes_ne: string;
    notes_id: string;

    duration_en: string;
    duration_ru: string;
    duration_ne: string;
    duration_id: string;
    
    price_en: string;
    price_ru: string;
    price_ne: string;
    price_id: string;

    type: Type

    country_id: string;
    country?: ICountry;
    region_id?: string;
    region?: ICountry;
}

enum Type{
    Personal = "Personal",
    Group = "Group",
}