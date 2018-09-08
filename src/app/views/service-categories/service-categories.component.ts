import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../shared/services/api-data-services';
import { Config } from '../../shared/config';
import { ModalDirective } from 'ngx-bootstrap';
import { ComFunction } from '../../shared/class';

declare var $;

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  constructor(private categoryService: CategoryService, private comFunc: ComFunction) { }

  Config = Config;
  readOnlyMode = false;
  isEditMode = false;

  selectedCategory: any = {};

  rows: Array<any> = [];
  columns = [
    { prop: 'name', name: 'Name', sortable: true },
    { prop: 'description', name: 'Description', sortable: false },
    { prop: 'statusName', name: 'Status', sortable: true },
    { name: 'Action', sortable: false}
  ];
  loading = true;
  sorting: any = {
    'key' : '',
    'value' : ''
  };
  pagination: any = {
    'pageNumber' : 0,
    'size' : 10,
    'totalRecords' : 0
  };

  selectAll = false;
  selected = [];

  ngOnInit() {
    this.getCategoryList();
  }

  private getCategoryList() {
    const req = {
      'offset': this.pagination.pageNumber,
      'limit': this.pagination.size,
      'searchKeys': [],
      'operators': [],
      'values': [],
      'orderByKey':  this.sorting.key || '',
      'orderByValue': this.sorting.value || '',
      'statuses': [
        Config.statusList.PENDING.id,
        Config.statusList.APPROVED.id,
        Config.statusList.SUSPENDED.id
      ]
    };
    this.categoryService.categoryFindByCriteria(req).subscribe((response: any) => {
      if (response) {
        this.pagination.totalRecords = response.recordCount;
        this.rows = response.data;
      }
      this.selectAll = false;
      this.selected.splice(0, this.selected.length);
      this.hideLoading();
    }, error => {
      this.selectAll = false;
      this.selected.splice(0, this.selected.length);
      this.hideLoading();
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onCategoryFormSubmit (cat_form) {
    if (cat_form.valid) {
      if (!this.isEditMode) {
        const req = {
          'name': cat_form.value.name,
          'description': cat_form.value.description,
          'imageUrl': ''
        };
        this.categoryService.createCategory(req).subscribe((response: any) => {
          this.hideModal();
          this.getCategoryList();
          // this.rows.splice(0, 0, response.data);
          // this.pagination.totalRecords++;
        });
      } else {
        const req = {
          'categoryId': this.selectedCategory.categoryId,
          'name': cat_form.value.name,
          'description': cat_form.value.description,
          'imageUrl': ''
        };
        this.categoryService.updateCategory(req).subscribe((response: any) => {
          this.hideModal();
          // this.rows.splice(0, 0, response.data);
          this.getCategoryList();
          // this.pagination.totalRecords++;
        });
      }
    }
  }

  updateStatusOfSelected (status) {
    for (const row of this.selected) {
      this.updateStatus(row, status);
    }
  }

  updateStatus (row, status) {
    const req = {
      'primaryId' : row.categoryId,
      'status' : status
    };
    const rowIndex = this.rows.indexOf(row);
    this.categoryService.updateCategoryStatus(req).subscribe((response) => {
      if (status === Config.statusList.DELETED.id) {
        this.rows.splice(rowIndex, 1);
        this.pagination.totalRecords--;
      } else {
        this.rows[rowIndex]['status'] = status;
        this.rows[rowIndex]['statusName'] = this.comFunc.getStatusName(status);
      }
      this.getCategoryList();
    });
  }

  setPage(pageInfo) {
    this.loading = true;
    this.pagination.pageNumber = pageInfo.offset;
    this.getCategoryList();
  }

  onSort(event) {
    this.loading = true;
    this.sorting.key = event.sorts[0].prop;
    this.sorting.value = event.sorts[0].dir;
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

  private hideLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  hideModal() {
    this.modal.hide();
  }

}
