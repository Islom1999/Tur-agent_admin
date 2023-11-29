interface IBaseItem{
    en_name: string;
    ru_name: string;
    kr_name: string;
}
export interface ICarMakerItem{
    group: string;
    model: string;
    image: string;
    modelCount:number;
}
export interface ICarModelItem extends IBaseItem{
    model: string;
}
export interface ICarSpecItem extends IBaseItem{
    group: string;
    image: string;
}

export interface IMainPartItem extends IBaseItem{
    image: string;
    subCount: number;
    partCount: number;
    subPercentage: number;
    partPercentage: number;
}
export interface ISubPartItem extends IBaseItem{
    model: string;
    parCount: number;
    partPercentage: number;
}
export interface IPartNameItem extends IBaseItem{
    
}