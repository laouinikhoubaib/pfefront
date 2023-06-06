import {Alimentation} from './alimentation';
import {CategorieVehicule} from './CategorieVehicule';
import {Agence} from './agence';


export class Vehicule {
  vehiculeId!: any;
  matricule!: string;
  nbrplaces!: string;
  couleur!: string;
  longueur!: string;
  largeur!: string;
  puissance!: string;
  chargeutile!: string;
  description!: string;
  dateajout!: any;
  picture!: string;
  jourslocation!: any;
  [key: string]: any;
  agence?: Agence;
  nomAgence?: string;
  vehiculeCategorievehiculeCategories: CategorieVehicule[];
  alimentation!: Alimentation;
}
