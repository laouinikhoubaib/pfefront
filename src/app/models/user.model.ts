import {Role} from './role.enum';
import {Agence} from './agence';
import {Complaint} from './complaint';

export class User {
    userId!: number;
    username!: string;
    password: string = "";
    role!: Role;
    email!: string;
    loginAttempts: number = 0;
    locked: boolean = false;
    accessToken!: string;
    refreshToken!: string;
    profilPic!: string;
    birthDate!: Date;
    agence?: Agence;
    nomAgence?: string;
    complaint: Complaint[];


}
