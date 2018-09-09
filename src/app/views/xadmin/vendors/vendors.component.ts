import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from '../../../shared/config/index';
import { VendorService } from '../../../shared/services/api-data-services/index';
import { ComFunction } from '../../../shared/class/index';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  constructor(private vendorService: VendorService, private comFunc: ComFunction) { }

  Config = Config;
  readOnlyMode = false;
  isEditMode = false;

  selectedVendor: any = {};

  tableConfig: any = {
    rows : [],
    columns : [
      { prop: 'name', name: 'Name', sortable: true },
      { prop: 'ownerName', name: 'Owner', sortable: true },
      { prop: 'mobile', name: 'Mobile', sortable: true },
      { prop: 'email', name: 'Email', sortable: true },
      { prop: 'status', name: 'Status', sortable: true },
      { name: 'Action', sortable: false}
    ],
    loading : true,
    sorting : {
      'key' : '',
      'value' : ''
    },
    pagination : {
      'pageNumber' : 0,
      'size' : Config.pageSize,
      'totalRecords' : 0
    },
    selectAll : false,
    selected : []
  };


  ngOnInit() {
    this.getVendorList();
  }

  private getVendorList() {
    const req = {
      'offset': this.tableConfig.pagination.pageNumber,
      'limit': this.tableConfig.pagination.size,
      'searchKeys': [],
      'operators': [],
      'values': [],
      'orderByKey':  this.tableConfig.sorting.key || '',
      'orderByValue': this.tableConfig.sorting.value || '',
      'statuses': [
        Config.statusList.PENDING.id,
        Config.statusList.APPROVED.id,
        Config.statusList.SUSPENDED.id
      ]
    };
    this.vendorService.vendorFindByCriteria(req).subscribe((response: any) => {
      if (response) {
        this.tableConfig.pagination.totalRecords = response.recordCount;
        this.tableConfig.rows = response.data;
      }
      this.tableConfig.selectAll = false;
      this.clearSelectedRows();
      this.hideLoading();
    }, error => {
      this.tableConfig.selectAll = false;
      this.clearSelectedRows();
      this.hideLoading();
    });
  }

  onSelect({ selected }) {
    this.clearSelectedRows();
    this.tableConfig.selected.push(...selected);
  }

  onVendorFormSubmit (cat_form) {
    // if (cat_form.valid) {
    //   if (!this.isEditMode) {
    //     const req = {
    //       'name': cat_form.value.name,
    //       'description': cat_form.value.description,
    //       'imageUrl': ''
    //     };
    //     this.vendorService.createVendor(req).subscribe((response: any) => {
    //       this.hideModal();
    //       this.getVendorList();
    //     });
    //   } else {
    //     const req = {
    //       'categoryId': this.selectedVendor.categoryId,
    //       'name': cat_form.value.name,
    //       'description': cat_form.value.description,
    //       'imageUrl': ''
    //     };
    //     this.vendorService.updateVendor(req).subscribe((response: any) => {
    //       this.hideModal();
    //       this.getVendorList();
    //     });
    //   }
    // }
  }

  updateStatusOfSelected (status) {
    for (const row of this.tableConfig.selected) {
      this.updateStatus(row, status);
    }
  }

  updateStatus (row, status) {
    const req = {
      'primaryId' : row.serviceProviderId,
      'status' : status
    };
    this.vendorService.updateVendorStatus(req).subscribe((response) => {
      this.getVendorList();
    });
  }

  setPage(pageInfo) {
    this.tableConfig.loading = true;
    this.tableConfig.pagination.pageNumber = pageInfo.offset;
    this.getVendorList();
  }

  onSort(event) {
    this.tableConfig.loading = true;
    this.tableConfig.sorting.key = event.sorts[0].prop;
    this.tableConfig.sorting.value = event.sorts[0].dir;
    this.getVendorList();
  }

  addNewRow() {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = false;
    this.selectedVendor = {};
  }

  viewRow (row) {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = true;
    this.selectedVendor = row;
  }

  editRow (row) {
    this.modal.show();
    this.isEditMode = true;
    this.readOnlyMode = false;
    this.selectedVendor = row;
  }

  deleteRow (row) {
    this.updateStatus(row, Config.statusList.DELETED.id);
  }

  private clearSelectedRows () {
    this.tableConfig.selected.splice(0, this.tableConfig.selected.length);
  }

  private hideLoading() {
    setTimeout(() => {
      this.tableConfig.loading = false;
    }, 500);
  }

  hideModal() {
    this.modal.hide();
  }

}
