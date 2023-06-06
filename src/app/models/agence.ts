
import {TypeAgence} from './typeagence';
import {User} from './user.model';


export class Agence{

    agenceId!: number;
    numero!: string;
    nom!: string;
    email!: string;
    adresse!: string;
    dateouverture!: Date;
    datefermeture!: Date;
    jourtravail!: string;
    description!: string;
    typeagence!: TypeAgence;
    locked: boolean = false;
    user: User[];

}
