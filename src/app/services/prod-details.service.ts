import { Injectable } from '@angular/core';
import * as filterData from '../components/dummyData/user-pref-data';
import * as allData from '../components/dummyData/data';
import { FilterOption } from '../Interfaces/sessionInterfaces';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdDetailsService {

  currentProduct$ = new BehaviorSubject<string>(null);
  column1$ = new BehaviorSubject<FilterOption[]>([...filterData.col1]);
  column2$ = new BehaviorSubject<FilterOption[]>([...filterData.col2]);
  column3$ = new BehaviorSubject<FilterOption[]>([...filterData.col3]);
  // sessionData$ = new BehaviorSubject<any>(null);
  productDetails$ = new BehaviorSubject<any>(null);
  currProdSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.currProdSubscription = this.currentProduct$.pipe(concatMap((res: string) => {
      if (res) {
        return this.http.get('api/get_details/' + res + '/');
      } else {
        return of(null);
      }
    })).subscribe(prodDetails => {
      this.productDetails$.next(prodDetails);
    });
   }

  getProductList() {
    return this.http.get('api/get_products/');
  }

  // getSessionDataFromAPI() {
  //   this.sessionData$.next(allData.data.productFamilyDetails);
  // }

  resetSubscriptions() {
    this.currProdSubscription.unsubscribe();
  }
}
