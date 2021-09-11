import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestLineChartComponent } from './components/test-line-chart/test-line-chart.component';
import { TestBarChartComponent } from './components/test-bar-chart/test-bar-chart.component';
import { OrgChartComponent } from './components/org-chart/org-chart.component';
import { OrgChartNodeComponent } from './components/org-chart/org-chart-node/org-chart-node.component';
import { PidSearchPipe } from './pipes/pid-search.pipe';
import { TreeComponent } from './components/tree/tree.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './components/loader/loader.interceptor';
import { ProdSearchPipe } from './pipes/prod-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    jqxChartComponent,
    HomeComponent,
    ProductDetailsComponent,
    TestLineChartComponent,
    TestBarChartComponent,
    OrgChartComponent,
    OrgChartNodeComponent,
    PidSearchPipe,
    TreeComponent,
    LoaderComponent,
    ProdSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
