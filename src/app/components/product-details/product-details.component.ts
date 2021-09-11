import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterOption } from '../../Interfaces/sessionInterfaces';
import { ProductHierarchy } from '../../Interfaces/productHierarchy';
import { Tree } from '../tree/TreeInterface.ts/tree';
import { ProdDetailsService } from '../../services/prod-details.service';
import * as empData from '../dummyData/pro-hierarchy-data';
import * as use_case_tree from '../dummyData/use-case-data';
import * as tms_tree from '../dummyData/tms-hierarchy-data';
import * as be_tree from '../dummyData/be-hierarchy-data';
import { ProductList } from 'src/app/Interfaces/productList';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  prodList: ProductList;
  sessionData: any;
  selectedProd: string;
  enableView = false;
  filterPanelOpen = false;
  column1Form: FormGroup;
  column2Form: FormGroup;
  column3Form: FormGroup;
  summary;                 // Object For Summary Tile
  prodManagement = [];     // Array For Product Management Tile
  pidCount;                // Object For pidCount in E-Genie Attributes Tile
  eGeniePidList = [];      // Array For auto-complete options in E-Genie Attributes Tile
  specsPidList = [];       // Array For auto-complete options in Product Specifications Tile
  eGenieSelectedPid;       // Object For Selected option in E-Genie Attributes Tile
  specsSelectedPid;        // Object For Selected option in Product Specifications Tile
  relatedProds = [];       // Array For Links in Related Porducts Tile
  connectedQuality;        // Object For Connected Quality Tile
  productHierarchy: ProductHierarchy;      // Object For Product Hierarchy Tile
  useCase: Tree;           // Object For CX Use Cases Tile
  tmsTree: Tree;           // Object For TMS Hierarchy Tile
  beTree: Tree;            // Object For BE Hierarchy Tile

  private destroy$ = new Subject();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private prodDetailsService: ProdDetailsService,
    private sanitizer: DomSanitizer
    ) {
      this.activeRoute.paramMap.subscribe((route: any) => {
        this.selectedProd = route.params.prodId;
        // Trigger API call to fetch data whenever route param changes
        this.prodDetailsService.currentProduct$.next(this.selectedProd);
      });
    }

  ngOnInit() {
    // Trigger API call to fetch List of Products
    this.prodDetailsService.getProductList().pipe(takeUntil(this.destroy$))
    .subscribe((res: ProductList) => {
      this.prodList = res;
    });
    // Get Data for Each tile from API and Update the local variables for each tile
    this.prodDetailsService.productDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        // console.log('All Data', res);
        this.sessionData = res;
        this.setupDataForEachTile(res);
        this.enableView = true;
      }
    });
    // // Trigger API call to fetch data
    // this.prodDetailsService.getSessionDataFromAPI();

    // // Get Data for Each tile from API and Update the local variables for each tile
    // this.prodDetailsService.sessionData$.pipe(takeUntil(this.destroy$)).subscribe(res => {
    //   this.setupDataForEachTile(res);
    // });

    combineLatest(
      this.prodDetailsService.column1$,
      this.prodDetailsService.column2$,
      this.prodDetailsService.column3$
    ).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      // Get List of Items for Each Column and Create each Form only once
      if (res[0].length && !this.column1Form) {
        this.column1Form = new FormGroup(this.createForm(res[0]));
      }
      if (res[1].length && !this.column2Form) {
        this.column2Form = new FormGroup(this.createForm(res[1]));
      }
      if (res[2].length && !this.column3Form) {
        this.column3Form = new FormGroup(this.createForm(res[2]));
      }
    });

    // Listen to valuechange for each FormControl in each Column
    this.detectFilterOptChange();
  }

  createForm(filterOpts: FilterOption[]) {
    // Create FormControls for Each Form keeping only 'Summary' Disabled
    const filterGroup: any = {};
    filterOpts.forEach((pref) => {
      if (pref.option === 'Summary') {
        filterGroup[pref.option] = new FormControl({value: pref.selected, disabled: true});
      } else {
        filterGroup[pref.option] = new FormControl(pref.selected);
      }
    });
    return filterGroup;
  }

  prodSelect(e) {
    // console.log(e.option.viewValue, this.selectedProd);
    this.router.navigate(['product-details/' + this.selectedProd]);
  }

  setupDataForEachTile(res): void {
    // this.summary = {...res.prod_details};
    this.summary = res.prod_details.description ? {...res.prod_details}
    : {...res.prod_details, description: 'NO DATA'};
    // this.prodManagement = [
    //   {
    //     name: 'Albert Robertson',
    //     designation: 'Product Manager - Engineering'
    //   },
    //   {
    //     name: 'Brandie Mckinney',
    //     designation: 'Product Manager - Marketing'
    //   },
    //   {
    //     name: 'Kim Chang',
    //     designation: 'Product Manager - Engineering'
    //   }
    // ];
    this.prodManagement = [...res.prod_management.slice(0, 2)];
    this.pidCount = res.pid_attributes.length;
    this.eGeniePidList = [...res.pid_attributes];
    this.specsPidList = [...res.prod_specifications];
    this.eGenieSelectedPid = this.eGeniePidList[0];
    this.specsSelectedPid = this.specsPidList[0];
    if (res.related_products && res.related_products.length) {
      this.relatedProds = [
        ...res.related_products
        .map(url => {
          return {
            Link: this.sanitizer.bypassSecurityTrustResourceUrl(url.Related_Product_Links),
            Name: url.Related_Product
          };
        })
      ];
    } else {
      this.relatedProds = [];
    }
    this.connectedQuality = {...res.connected_quality[0]};
    this.productHierarchy = {...res.product_hierarchy};
    this.useCase = {...res.use_cases};
    this.beTree = {...res.be_hierarchy};
    this.setTmsHierarchyData(this.eGenieSelectedPid.PID);
  }

  setTmsHierarchyData(name: string) {
    const fetchedTMS = this.sessionData.tms_hierarchy.find((pid: Tree) => pid.name === name);
    if (fetchedTMS) {
      this.tmsTree = {...fetchedTMS.data};
    } else {
      this.tmsTree = null;
    }
  }

  detectFilterOptChange() {
    for (const key of Object.keys(this.column1Form.controls)) {
      this.column1Form.controls[key].valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        const updatedColumn: FilterOption[] = [...this.prodDetailsService.column1$.value];
        updatedColumn.find((opt: FilterOption) => opt.option === key).selected = value;
        this.prodDetailsService.column1$.next(updatedColumn);
      });
    }
    for (const key of Object.keys(this.column2Form.controls)) {
      this.column2Form.controls[key].valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        const updatedColumn: FilterOption[] = [...this.prodDetailsService.column2$.value];
        updatedColumn.find((opt: FilterOption) => opt.option === key).selected = value;
        this.prodDetailsService.column2$.next(updatedColumn);
      });
    }
    for (const key of Object.keys(this.column3Form.controls)) {
      this.column3Form.controls[key].valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        const updatedColumn: FilterOption[] = [...this.prodDetailsService.column3$.value];
        updatedColumn.find((opt: FilterOption) => opt.option === key).selected = value;
        this.prodDetailsService.column3$.next(updatedColumn);
      });
    }
  }

  closeTile(tile: FilterOption, column: number) {
    // Close each Tile when Cancel Button is clicked and update the respective FormControl
    switch (column) {
      case 1: {
        this.column1Form.get(tile.option).patchValue(false);
        break;
      }
      case 2: {
        this.column2Form.get(tile.option).patchValue(false);
        break;
      }
      case 3: {
        this.column3Form.get(tile.option).patchValue(false);
        break;
      }
    }
  }

  getInitials(name: string): string {
    // Convert a Name into Initials for Product Management Tile
    const inititals: string[] = name.split(' ');
    if (inititals.length === 1) {
      return inititals[0][0].toUpperCase();
    } else {
      return (inititals[0][0] + inititals[inititals.length - 1][0]).toUpperCase();
    }
  }

  checkNA(data: string) {
    // console.log(data);
    if (data.toString().toLowerCase() === 'na') {
      return 0;
    } else {
      return data;
    }
  }

  toggleFilterPanel() {
    // Open/Close Filter Panel
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  pidDisplayFn(pid): string {
    if (pid) {
      // Return Name from pid object to be Used in E-Genie Attributes Tile
      if ('PID' in pid) {
        return pid ? pid.PID : '';
      }
      // Return PID from pid object to be Used in Product Specifications Tile
      if ('Model' in pid) {
        return pid ? pid.Model : '';
      }
    } else {
      return '';
    }
  }

  pidSelect(e, type: string) {
    // Update eGenieSelectedPid/specsSelectedPid based on Selection form Auto-complete options
    switch (type) {
      case 'eGenie': {
        this.eGenieSelectedPid = {...this.eGeniePidList.find(pid => pid.PID === e.option.viewValue)};
        this.setTmsHierarchyData(this.eGenieSelectedPid.PID);
        break;
      }
      case 'specs': {
        this.specsSelectedPid = {...this.specsPidList.find(pid => pid.Model === e.option.viewValue)};
        break;
      }
    }
  }

  ngOnDestroy() {
    // Unsubscribe all subscriptions
    this.destroy$.next();
    this.prodDetailsService.resetSubscriptions();
  }

}
