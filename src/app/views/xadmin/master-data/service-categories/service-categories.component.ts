import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../shared/services/api-data-services/index';
import {AppConfig, Config} from '../../../../shared/config/index';
import { ModalDirective } from 'ngx-bootstrap';
import { ComFunction } from '../../../../shared/class/index';

declare var $;

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  public fileUploadConfig: any = {};

  AppConfig = AppConfig;
  Config = Config;
  readOnlyMode = false;
  isEditMode = false;

  selectedCategory: any = {};

  tableConfig: any = {
    rows : [],
    columns : [
      { prop: 'name', name: 'Name', sortable: true },
      { prop: 'description', name: 'Description', sortable: false },
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

  constructor(private categoryService: CategoryService, private comFunc: ComFunction) { }

  ngOnInit() {
    this.getCategoryList();
  }

  private getCategoryList() {
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
    this.categoryService.categoryFindByCriteria(req).subscribe((response: any) => {
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

  onCategoryFormSubmit (cat_form) {
    if (cat_form.valid) {
      if (!this.isEditMode) {
        const req = {
          'name': cat_form.value.name,
          'description': cat_form.value.description,
          'imageUrl': this.selectedCategory.imageUrl
        };
        this.categoryService.createCategory(req).subscribe((response: any) => {
          this.hideModal();
          this.getCategoryList();
        });
      } else {
        const req = {
          'categoryId': this.selectedCategory.categoryId,
          'name': cat_form.value.name,
          'description': cat_form.value.description,
          'imageUrl': this.selectedCategory.imageUrl
        };
        this.categoryService.updateCategory(req).subscribe((response: any) => {
          this.hideModal();
          this.getCategoryList();
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
      'primaryId' : row.categoryId,
      'status' : status
    };
    this.categoryService.updateCategoryStatus(req).subscribe((response) => {
      this.getCategoryList();
    });
  }

  setPage(pageInfo) {
    this.tableConfig.loading = true;
    this.tableConfig.pagination.pageNumber = pageInfo.offset * Config.pageSize;
    this.getCategoryList();
  }

  onSort(event) {
    this.tableConfig.loading = true;
    this.tableConfig.sorting.key = event.sorts[0].prop;
    this.tableConfig.sorting.value = event.sorts[0].dir;
    this.getCategoryList();
  }

  addNewRow() {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = false;
    this.selectedCategory = {};
  }

  viewRow (row) {
    this.modal.show();
    this.isEditMode = false;
    this.readOnlyMode = true;
    this.selectedCategory = row;
  }

  editRow (row) {
    this.modal.show();
    this.isEditMode = true;
    this.readOnlyMode = false;
    this.selectedCategory = row;
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

  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      this.selectedCategory.imageUrl = $event.data.fileName;
    }
  }

}
