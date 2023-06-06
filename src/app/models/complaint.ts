import {ComplaintType} from './ComplaintType.enum';
import {ComplaintStatus} from './ComplaintStatus.enum';
import {User} from './user.model';


export class Complaint {


    ComplaintId!: string;
    description!: string;
    complaintDate!: Date;
    Etat: boolean = false;
    complaintType!: ComplaintType;
    complaintStatus!: ComplaintStatus;
    userId!: number;
    user: User;
}
