import {ComplaintStatus} from './ComplaintStatus.enum';
import {ReservationStatusEnum} from './ReservationStatusEnum.enum';


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
   client: string;
   reservationStatus!: ReservationStatusEnum;

}
