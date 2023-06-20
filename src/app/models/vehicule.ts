import {Alimentation} from './alimentation';
import {Agence} from './agence';
import {Categorie} from './categorie';
import {TypeUtilitaire} from './typeUtilitaire';
import {TypeVoiture} from './typeVoiture';


export class Vehicule {
  vehiculeId!: any;
  matricule!: string;
  nbr_places!: string;
  couleur!: string;
  longueur!: string;
  largeur!: string;
  puissance!: string;
  charge_utile!: string;
  description!: string;
  dateajout!: Date;
  picture!: string;
  prix: any;
  jourslocation!: any;
  [key: string]: any;
  agence?: Agence;
  nomAgence?: string;
  alimentation!: Alimentation;
  categorie!: Categorie;
  typeUtilitaire!: TypeUtilitaire;
  typeVoiture!: TypeVoiture;
}
