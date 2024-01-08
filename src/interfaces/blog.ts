import { ICountry } from "./country";

export interface IBlog {
    id?: string;
    images: string[];
    
    title_en: string;
    title_ru: string;
    title_ne: string;
    title_id: string;
    description_en: string;
    description_ru: string;
    description_ne: string;
    description_id: string;

    date: Date

}