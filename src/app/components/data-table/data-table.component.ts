import { Component, OnInit } from '@angular/core';
import { Config } from '../../shared/config';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  Config = Config;
  tableConfig: any = Config.dataTableConfig;
  rows;
  columns;
  selected;
  pagination;
  loading;

  constructor() { }

  ngOnInit() {
  }

  onSort(event) {

  }

  setPage(event) {

  }

  onSelect(event) {

  }

  viewRow() {

  }

  editRow() {

  }

  updateStatus() {

  }

}
