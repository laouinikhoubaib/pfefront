import {ComplaintStatus} from './ComplaintStatus.enum';
import {ReservationStatusEnum} from './ReservationStatusEnum.enum';
import {Client} from './client';


export class Reservation {

   reservid: any;
   datedebut: Date;
   datefin: Date;
   nbjour: any;
   prix: any;
   state!: string;
   vehiculeReservation: any;
   reservationVehicule: any;
   reservationStatus!: ReservationStatusEnum;
   client: Client = new Client();
   clientName: string;
   clientPermis: string;
   clientSurname: string;

   matricule: string;
   categorie: string;
   modele: string;
   nbrplaces: string;
   chargeutile: string;

   username: string;

   vehiculeId: number;

}
