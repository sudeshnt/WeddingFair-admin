import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../shared/services/api-data-services';
import { Config } from '../../shared/config';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {
  @ViewChild('myModal') public modal: ModalDirective;

  Config = Config;
  rows: Array<any> = [];
  columns = [
    { prop: 'name', name: 'Name', sortable: true },
    { prop: 'description', name: 'Description', sortable: false },
    { prop: 'status', name: 'Status', sortable: true },
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

  selected = [];

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  onCategoryFormSubmit (cat_form) {
    if (cat_form.valid) {
      const req = {
        'name': cat_form.value.name,
        'description': cat_form.value.description,
        'imageUrl': ''
      };
      this.categoryService.createCategory(req).then((response: any) => {
        this.modal.hide();
        this.rows.splice(0, 0, response.data);
        this.pagination.totalRecords++;
      });
    }
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
        Config.statusList.PENDING,
        Config.statusList.APPROVED,
        Config.statusList.SUSPENDED
      ]
    };
    this.categoryService.categoryFindByCriteria(req).then((response: any) => {
      if (response) {
        this.pagination.totalRecords = response.recordCount;
        this.rows = response.data;
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }, error => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  updateStatusOfSelected (status) {
    for (const i in this.selected) {
      this.updateStatus(i, status);
    }
  }

  updateStatus (rowIndex, status) {
    const req = {
      'primaryId' : this.rows[rowIndex].categoryId,
      'status' : status
    };
    this.categoryService.updateCategoryStatus(req).then((response) => {
      if (status === Config.statusList.DELETED) {
        this.rows.splice(rowIndex, 1);
        this.pagination.totalRecords--;
      } else {
        this.rows[rowIndex].status = status;
      }
    });
  }

  setPage(pageInfo) {
    this.pagination.pageNumber = pageInfo.offset;
    this.getCategoryList();
  }

  onSort(event) {
    this.loading = true;
    this.sorting.key = event.sorts[0].prop;
    this.sorting.value = event.sorts[0].dir;
    this.getCategoryList();

  }

  viewRow (row) {
    console.log(row);
  }

  editRow (row) {
    console.log(row);
  }

  deleteRow (row) {
    console.log(row);
  }

}
