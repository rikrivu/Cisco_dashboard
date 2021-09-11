import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TestLineChartComponent } from './components/test-line-chart/test-line-chart.component';
import { TestBarChartComponent } from './components/test-bar-chart/test-bar-chart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product-details/:prodId',
    component: ProductDetailsComponent
  },
  {
    path: 'line',
    component: TestLineChartComponent
  },
  {
    path: 'bar',
    component: TestBarChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
