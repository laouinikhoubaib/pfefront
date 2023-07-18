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
   paiementRese: Number;
   vehiculeReservation: any;
   reservationVehicule: any;
   userReservation: any;
   qrcode: string;
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

}
