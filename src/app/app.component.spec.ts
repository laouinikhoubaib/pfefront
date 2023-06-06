import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './back/app.main.component';
import { AppConfigComponent } from './back/app.config.component';
import { AppTopBarComponent } from './back/app.topbar.component';
import { AppFooterComponent } from './back/app.footer.component';
import { AppMenuComponent } from './back/app.menu.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule],
            declarations: [
                AppComponent,
                AppMainComponent,
                AppConfigComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppFooterComponent,
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
