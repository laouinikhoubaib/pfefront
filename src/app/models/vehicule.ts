import {Alimentation} from './alimentation';
import {Agence} from './agence';
import {Categorie} from './categorie';
import {TypeUtilitaire} from './typeUtilitaire';
import {TypeVoiture} from './typeVoiture';


export class Vehicule {
  vehiculeId!: any;
  matricule!: string;
  nbrPlaces!: string;
  couleur!: string;
  longueur!: string;
  modele!: string;
  largeur!: string;
  puissance!: string;
  chargeutile!: string;
  description!: string;
  dateajout!: Date;
  picture!: string;
  prix: any;
  quantite!: any;
  isLocked: boolean = false;
  jourslocation!: any;
  [key: string]: any;
  agence?: Agence;
  nomAgence?: string;
  alimentation!: Alimentation;
  categorie!: Categorie;
  typeUtilitaire!: TypeUtilitaire;
  typeVoiture!: TypeVoiture;

}
