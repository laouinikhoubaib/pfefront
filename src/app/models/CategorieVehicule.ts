import {Vehicule} from './vehicule';
import {LocationVoitureEn} from './LocationVoitureEn';
import {LocationUtilitaireEn} from './LocationUtilitaireEn';


export class CategorieVehicule {
    categorieutilitaireId: number;
    locationUtilitaire: LocationUtilitaireEn;
    locationVoiture: LocationVoitureEn;
    vehiculeCategorie: Vehicule;
}
