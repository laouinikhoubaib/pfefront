import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AuthGuard} from '../guards/auth.guard';
import {Role} from '../models/role.enum';
import {Auth2Guard} from '../guards/auth2.guard';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Main', icon: 'pi pi-home',
                items: [
                    {label: 'Front office', icon: 'pi pi-fw pi-directions', routerLink: ['/user/landing']}
                ]
            },
            {separator: true},
            {
                label: 'Sections', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Réservations', icon: 'pi pi-fw pi-id-card', routerLink: ['réservation']},
                    {label: 'Contrats et factures', icon: 'pi pi-fw pi-comment', routerLink: ['contrat']},
                    {label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['Calendrier']},
                    {label: 'Gestion des véhicules', icon: 'pi pi-fw pi-file', routerLink: ['listVehiculesback']},
                    {label: 'Agences', icon: 'pi pi-exclamation-circle', routerLink: ['agence']},
                    {label: 'Réclamations', icon: 'pi pi-exclamation-triangle', routerLink: ['complaint']}

                ]
            },
        ];
    }
}
