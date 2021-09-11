import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductList } from '../../Interfaces/productList';
import { ProdDetailsService } from 'src/app/services/prod-details.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedProd: string;
  prodList: ProductList;

  destroy$ = new Subject();

  constructor(
    private prodDetailsService: ProdDetailsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.prodDetailsService.getProductList().pipe(takeUntil(this.destroy$))
    .subscribe((res: ProductList) => {
      this.prodList = res;
    });
  }

  prodSelect(e) {
    console.log(e.option.viewValue, this.selectedProd);
    this.router.navigate(['product-details/' + this.selectedProd]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
