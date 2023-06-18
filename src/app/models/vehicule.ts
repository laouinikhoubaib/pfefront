import {Alimentation} from './alimentation';
import {CategorieVehicule} from './CategorieVehicule';
import {Agence} from './agence';
import {Categorie} from './categorie';
import {TypeUtilitaire} from './typeUtilitaire';
import {TypeVoiture} from './typeVoiture';


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
  prix: any;
  jourslocation!: any;
  [key: string]: any;
  agence?: Agence;
  nomAgence?: string;
  vehiculeCategorievehiculeCategories: CategorieVehicule[];
  alimentation!: Alimentation;
  categorie!: Categorie;
  typeUtilitaire!: TypeUtilitaire;
  typeVoiture!: TypeVoiture;
}
