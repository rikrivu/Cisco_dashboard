import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  // tslint:disable-next-line: variable-name
  private _loading = false;
  loadingStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
    this.loadingStatus$.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
