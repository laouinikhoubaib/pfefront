import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { LazyLoadEvent } from 'primeng/api';
import {AppCodeModule} from './back/app.code.component';
import {AppComponent} from './app.component';
import {AppMainComponent} from './back/app.main.component';
import {AppConfigComponent} from './back/app.config.component';
import {AppRightmenuComponent} from './back/app.rightmenu.component';
import {AppMenuComponent} from './back/app.menu.component';
import {AppMenuitemComponent} from './back/app.menuitem.component';
import {AppTopBarComponent} from './back/app.topbar.component';
import {AppSearchComponent} from './back/app.search.component';
import {AppFooterComponent} from './back/app.footer.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {BreadcrumbService} from './back/app.breadcrumb.service';
import {MenuService} from './back/app.menu.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { FrontFooterComponent } from './user/front-footer/front-footer.component';
import { FrontLandingComponent } from './user/front-landing/front-landing.component';
import { ProfilComponent } from './user/profil/profil.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './user/new-password/new-password.component';
import { AdminDashboardBackofficeComponent } from './user/admin-dashboard-backoffice/admin-dashboard-backoffice.component';
import {AgenceComponent} from './agence/agence.component';
import {SAdminDashboardBackofficeComponent} from './user/super-admin-dashboard-backoffice/super-admin-dashboard-backoffice.component';
import {
    FAdminDashboardBackofficeComponent
} from './user/franchise-admin-dashboard-backoffice/franchise-admin-dashboard-backoffice.component';
import { ComplaintComponent } from './complaint/complaint.component';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {AddPostComponent} from './forum/add-post/add-post.component';
import {ChatComponent} from './forum/chat/chat.component';
import {ChatPriveComponent} from './forum/chat-prive/chat-prive.component';
import {PostDetailsComponent} from './forum/post-details/post-details.component';
import {UserPostsComponent} from './forum/user-posts/user-posts.component';
import {ForumComponent} from './forum/forum.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AddReservationComponent} from './reservation/add-reservation/add-reservation.component';
import {ListeReservationComponent} from './reservation/liste-reservation/liste-reservation.component';
import {ReservationComponent} from './reservation/reservation.component';
import {ListeVehiculeFrontComponent} from './vehicule/liste-vehicule/liste-vehicules.component';
import {ListeVehiculesComponent} from './user/vehiculeBack/liste-rental-offer/liste-rental-offer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {CalendrierComponent} from './calendrier/calendrier.component';
import {ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import {ListeVehiculeUtilitaireFrontComponent} from './vehiculeutilitaire/liste-vehiculeutilitaire/liste-vehiculesutilitaire.component';
import {ListeVehiculeVoitureFrontComponent} from './vehiculevoiture/liste-vehiculevoiture/liste-vehiculevoiture.component';
import {MapComponent} from './agence/map/map.component';
import { AgenceFrontComponent } from './agence/agence-front/agence-front.component';
import { AgenceDeteilComponent } from './agence/agence-deteil/agence-deteil.component';
import { PaiementComponent } from './reservation/paiement/paiement.component';
import {ListeReservationAdminComponent} from './reservation/liste-reservation-admin/liste-reservation-admin.component';
import {ListeReservationFranchiseAdminComponent} from './reservation/liste-reservation-adminfranchise/liste-reservation-adminfranchise.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        NgxPaginationModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        AppCodeModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        Ng2SearchPipeModule,
        // CalendarModule,
        ScheduleModule,



    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AgenceComponent,
        AppRightmenuComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppTopBarComponent,
        AppSearchComponent,
        AppFooterComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        LoginComponent,
        ListeVehiculeUtilitaireFrontComponent,
        ListeVehiculeVoitureFrontComponent,
        HomeComponent,
        MapComponent,
        NavbarComponent,
        FrontFooterComponent,
        FrontLandingComponent,
        ProfilComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        FAdminDashboardBackofficeComponent,
        AdminDashboardBackofficeComponent,
        SAdminDashboardBackofficeComponent,
        ComplaintComponent,
        ChatboxComponent,
        AddPostComponent,
        ChatComponent,
        ChatPriveComponent,
        PostDetailsComponent,
        UserPostsComponent,
        ForumComponent,
        AddReservationComponent,
        ListeReservationComponent,
        ReservationComponent,
        ListeVehiculeFrontComponent,
        ListeVehiculesComponent,
        CalendrierComponent,
        AgenceFrontComponent,
        AgenceDeteilComponent,
        PaiementComponent,
        ListeReservationAdminComponent,
        ListeReservationFranchiseAdminComponent,


    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        MenuService, BreadcrumbService,
        DayService, WeekService, WorkWeekService, MonthService
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
