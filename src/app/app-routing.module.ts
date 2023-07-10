import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './back/app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './user/home/home.component';
import {FrontLandingComponent} from './user/front-landing/front-landing.component';
import {ProfilComponent} from './user/profil/profil.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {NewPasswordComponent} from './user/new-password/new-password.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role.enum';
import {Auth2Guard} from './guards/auth2.guard';
import {AdminDashboardBackofficeComponent} from './user/admin-dashboard-backoffice/admin-dashboard-backoffice.component';
import {AgenceComponent} from './agence/agence.component';
import {SAdminDashboardBackofficeComponent} from './user/super-admin-dashboard-backoffice/super-admin-dashboard-backoffice.component';
import {
    FAdminDashboardBackofficeComponent
} from './user/franchise-admin-dashboard-backoffice/franchise-admin-dashboard-backoffice.component';
import {ComplaintComponent} from './complaint/complaint.component';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {ForumComponent} from './forum/forum.component';
import {PostDetailsComponent} from './forum/post-details/post-details.component';
import {ChatPriveComponent} from './forum/chat-prive/chat-prive.component';
import {UserPostsComponent} from './forum/user-posts/user-posts.component';
import {ListeVehiculeFrontComponent} from './vehicule/liste-vehicule/liste-vehicules.component';
import {ListeVehiculesComponent} from './user/vehiculeBack/liste-rental-offer/liste-rental-offer.component';
import {AddReservationComponent} from './reservation/add-reservation/add-reservation.component';
import {ReservationComponent} from './reservation/reservation.component';
import {ListeReservationComponent} from './reservation/liste-reservation/liste-reservation.component';
import {CalendrierComponent} from './calendrier/calendrier.component';
import {ListeVehiculeUtilitaireFrontComponent} from './vehiculeutilitaire/liste-vehiculeutilitaire/liste-vehiculesutilitaire.component';
import {ListeVehiculeVoitureFrontComponent} from './vehiculevoiture/liste-vehiculevoiture/liste-vehiculevoiture.component';
import {MapComponent} from './agence/map/map.component';
import {AgenceFrontComponent} from './agence/agence-front/agence-front.component';
import {AgenceDeteilComponent} from './agence/agence-deteil/agence-deteil.component';
import {PaiementComponent} from './reservation/paiement/paiement.component';
import {ListeReservationAdminComponent} from './reservation/liste-reservation-admin/liste-reservation-admin.component';
import {ListeReservationFranchiseAdminComponent} from './reservation/liste-reservation-adminfranchise/liste-reservation-adminfranchise.component';



@NgModule({
        imports: [
            RouterModule.forRoot([
                {path: '', component: HomeComponent,
                    children: [
                        {path: '', component: FrontLandingComponent},
                        {path: 'profil', component: ProfilComponent, canActivate: [Auth2Guard]},
                        {path: 'profil/:id', component: UserDetailsComponent, canActivate: [Auth2Guard]},
                        {path: 'post-detais/:id', component: PostDetailsComponent, canActivate: [Auth2Guard]},
                        {path: 'forum', component: ForumComponent, canActivate: [Auth2Guard]},
                        {path: 'chat', component: ChatboxComponent},
                        {path: 'chatP', component: ChatPriveComponent},
                        {path: 'user-post', component: UserPostsComponent},
                        {path: 'listVehicules', component: ListeVehiculeFrontComponent },
                        {path: 'listVehiculesUtilitaires', component: ListeVehiculeUtilitaireFrontComponent},
                        {path: 'listVehiculesVoitures', component: ListeVehiculeVoitureFrontComponent},
                        {path: 'listeReservation/:id/ajout', component: AddReservationComponent },
                        {path: 'listeReservation/:id', component: ReservationComponent },
                        { path: 'listVehiculesVoitures/:id/ajout', component: ListeVehiculeVoitureFrontComponent },
                        { path: 'listVehiculesUtilitaires/:id/ajout', component: ListeVehiculeUtilitaireFrontComponent },
                        {path: 'map', component: MapComponent},
                        {path: 'agenceFront', component: AgenceFrontComponent, canActivate: [Auth2Guard]},
                        {path: 'detailAgence/:id', component: AgenceDeteilComponent, canActivate: [Auth2Guard]},
                        {path: 'addpayment/:id', component: PaiementComponent},
                        {path: 'calendrier', component: CalendrierComponent },
                    ]
                },
                {path: 'admin', component: AppMainComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} ,
                    children: [
                        {path: '', component: AdminDashboardBackofficeComponent},
                        {path: 'listVehicules', component: ListeVehiculeFrontComponent },
                        {path: 'listVehiculesback', component: ListeVehiculesComponent },
                        {path: 'listVehiculesUtilitaires', component: ListeVehiculeUtilitaireFrontComponent},
                        {path: 'listVehiculesVoitures', component: ListeVehiculeVoitureFrontComponent},
                        { path: 'listReservation/:id/ajout', component: ListeReservationAdminComponent },
                        {path: 'calendrier', component: CalendrierComponent },
                        {path: 'listReservation', component: ListeReservationAdminComponent },



                    ]
                },
                {path: 'adminfranchise', component: AppMainComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN_FRANCHISE]},
                    children: [
                        {path: '', component: FAdminDashboardBackofficeComponent},
                        {path: 'listVehicules', component: ListeVehiculeFrontComponent },
                        {path: 'listVehiculesback', component: ListeVehiculesComponent },
                        {path: 'listVehiculesUtilitaires', component: ListeVehiculeUtilitaireFrontComponent},
                        {path: 'listVehiculesVoitures', component: ListeVehiculeVoitureFrontComponent},
                        { path: 'listReservation/:id/ajout', component: ListeReservationFranchiseAdminComponent },
                        {path: 'calendrier', component: CalendrierComponent },
                        {path: 'listReservation', component: ListeReservationFranchiseAdminComponent },

                    ]
                },

                {path: 'superadmin', component: AppMainComponent, canActivate: [AuthGuard], data: {roles: [Role.SUPERADMIN]},
                    children: [
                        {path: 'agence', component: AgenceComponent},
                        {path: 'complaint', component: ComplaintComponent},
                        {path: 'calendrier', component: CalendrierComponent },
                        {path: 'listReservation', component: ListeReservationComponent },
                        {path: '', component: SAdminDashboardBackofficeComponent},
                        { path: 'listReservation/:id/ajout', component: ListeReservationComponent },
                        {path: 'listVehicules', component: ListeVehiculeFrontComponent },
                        {path: 'listVehiculesback', component: ListeVehiculesComponent },
                        {path: 'listVehiculesUtilitaires', component: ListeVehiculeUtilitaireFrontComponent},
                        {path: 'listVehiculesVoitures', component: ListeVehiculeVoitureFrontComponent},

                    ]
                },

                {path: 'user', component: HomeComponent,
                    children: [
                        {path: 'landing', component: FrontLandingComponent},
                        {path: 'profil', component: ProfilComponent},
                        {path: 'profil/:id', component: UserDetailsComponent},
                        {path: 'chat', component: ChatboxComponent},
                        {path: 'forum', component: ForumComponent},
                        {path: 'post-detais/:id', component: PostDetailsComponent},
                        {path: 'user-post', component: UserPostsComponent},
                        {path: 'listVehicules', component: ListeVehiculeFrontComponent },
                        {path: 'listVehiculesback', component: ListeVehiculesComponent },
                        {path: 'listVehiculesUtilitaires', component: ListeVehiculeUtilitaireFrontComponent},
                        {path: 'listVehiculesVoitures', component: ListeVehiculeVoitureFrontComponent},

                    ]
                },
                {path: 'error', component: AppErrorComponent},
                {path: 'access', component: AppAccessdeniedComponent},
                {path: 'notfound', component: AppNotfoundComponent},
                {path: 'reset-password', component: ForgotPasswordComponent},
                {path: 'new-password', component: NewPasswordComponent},
                {path: 'login', component: LoginComponent},
                {path: '**', redirectTo: '/notfound'},
            ])
        ],
        exports: [RouterModule]
    }
)
export class AppRoutingModule {
}
