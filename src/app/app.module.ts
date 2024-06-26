import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './modules/main/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ProjectManagerComponent } from './pages/admin/project-manager/project-manager.component';
import { AddProjectComponent } from './pages/admin/add-project/add-project.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AreaManagementComponent } from './pages/admin/area-management/area-management.component';
import { AddAreaComponent } from './pages/admin/add-area/add-area.component';
import { EditProjectComponent } from './pages/admin/edit-project/edit-project.component';
import { EditAreaComponent } from './pages/admin/edit-area/edit-area.component';
import { EditLandComponent } from './pages/admin/edit-land/edit-land.component';
import { AddLandComponent } from './pages/admin/add-land/add-land.component';
import { TransactionManagementComponent } from './pages/admin/transaction-management/transaction-management.component';
import { ViewTransactionComponent } from './pages/admin/view-transaction/view-transaction.component';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { CountdownModule } from 'ngx-countdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LandManagementComponent } from './pages/admin/land-management/land-management.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainComponent,
    DashboardComponent,
    ProjectManagerComponent,
    AddProjectComponent,
    AreaManagementComponent,
    AddAreaComponent,
    EditProjectComponent,
    EditAreaComponent,
    EditLandComponent,
    AddLandComponent,
    TransactionManagementComponent,
    ViewTransactionComponent,
    LandManagementComponent,
    AddLandComponent,
    UserListComponent,
    RegisterAdminComponent,
    LoginAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzInputModule,
    NzPaginationModule,
    NzBreadCrumbModule,
    NzFlexModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzCarouselModule,
    NzSliderModule,
    NzSelectModule,
    NzInputNumberModule,
    NzModalModule,
    NzDatePickerModule,
    NzBadgeModule,
    NzTableModule,
    NzQRCodeModule,
    CountdownModule,
    NzDropDownModule,
    NzUploadModule,
    NzMessageModule,
    NzTabsModule,
    NzSpinModule,
    NzListModule,
    NzToolTipModule,
    NzAutocompleteModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
