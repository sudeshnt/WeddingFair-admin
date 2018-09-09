import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from '../../../../shared/config/index';
import { ModalDirective } from 'ngx-bootstrap';
import { MasterDataService } from '../../../../shared/services/api-data-services/index';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  constructor(private masterDataService: MasterDataService) { }

  Config = Config;
  readOnlyMode = false;
  isEditMode = false;

  selectedCity: any = {};

  tableConfig: any = {
    rows : [],
    columns : [
      { prop: 'name', name: 'Name', sortable: true },
      { prop: 'postCode', name: 'Postal Code', sortable: false },
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
    this.getCityList();
  }

  private getCityList() {
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
    this.masterDataService.cityFindByCriteria(req).subscribe((response: any) => {
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

  onCityFormSubmit (city_form) {
    if (city_form.valid) {
      if (!this.isEditMode) {
        const req = {
          'name': city_form.value.name,
          'postCode': city_form.value.postCode
        };
        this.masterDataService.createCity(req).subscribe((response: any) => {
          this.hideModal();
          this.getCityList();
        });
      } else {
        const req = {
          'cityId': this.selectedCity.cityId,
          'name': city_form.value.name,
          'postCode': city_form.value.postCode
        };
        this.masterDataService.updateCity(req).subscribe((response: any) => {
          this.hideModal();
          this.getCityList();
        });
      }
    }
  }

  updateStatusOfSelected (status) {
    for (const row of this.tableConfig.selected) {
      this.updateStatus(row, status);
    }
  }

  updateStatus (row, status) {
    const req = {
      'primaryId' : row.cityId,
      'status' : status
    };
    this.masterDataService.updateCityStatus(req).subscribe((response) => {
      this.getCityList();
    });
  }

  setPage(pageInfo) {
    this.tableConfig.loading = true;
    this.tableConfig.pagination.pageNumber = pageInfo.offset;
    this.getCityList();
  }

  onSort(event) {
    this.tableConfig.loading = true;
    this.tableConfig.sorting.key = event.sorts[0].prop;
    this.tableConfig.sorting.value = event.sorts[0].dir;
    this.getCityList();
  }

  addNewRow() {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = false;
    this.selectedCity = {};
  }

  viewRow (row) {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = true;
    this.selectedCity = row;
  }

  editRow (row) {
    this.modal.show();
    this.isEditMode = true;
    this.readOnlyMode = false;
    this.selectedCity = row;
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
