import { IRole } from "./role";

export interface IUser {
    id: string;
    email: string;
    name?: string;
    isBlock: boolean;
    role_id: string;
    role?: IRole;
}

export interface IUserCreate {
    id?: string;
    email: string;
    password: string;
    name?: string;
    isBlock: boolean;
    role_id: string;
}


export interface IUserRole {
    role_id: string;
    isBlock: boolean;
}

export interface IPassword {
    password: string;
}