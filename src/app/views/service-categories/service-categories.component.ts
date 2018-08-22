import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/api-data-services';
import { Config } from '../../shared/config';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {

  rows: Array<any> = [];
  columns = [
    { prop: 'name', name: 'Name', sortable: true },
    { prop: 'description', name: 'Description', sortable: false }
  ];

  loading = true;
  sorting: any = {
    'key' : '',
    'value' : ''
  };
  pagination: any = {
    'pageNumber' : 0,
    'size' : 1,
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
        console.log(response);
      });
    }
  }

  getCategoryList() {
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
        setTimeout(() => {
          this.loading = false;
        }, 1000);
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

}
