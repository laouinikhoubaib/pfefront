import {Reservation} from './reservation';
import {Agence} from './agence';


export class Client {
    clientid: number;
    nom: string;
    prenom: string;
    adresse: string;
    datenaissance: Date;
    lieunaissance: string;
    permis: string;
    telephone: number;
    clientReservationReservations: Reservation[];
    agence: Agence;
}
