export class Config {

  public static adminTypes = {
    X_ADMIN : 1,
    SUPER_ADMIN : 2
  };

  public static statusList = {
    'CREATED' : {
      id: 0,
      name: 'Created',
      color: ''
    },
    'PENDING' : {
      id: 1,
      name: 'Pending',
      color: ''
    },
    'APPROVED' : {
      id: 2,
      name: 'Approved',
      color: ''
    },
    'CANCELED' : {
      id: 3,
      name: 'Canceled',
      color: ''
    },
    'REVERTED' : {
      id: 4,
      name: 'Reverted',
      color: ''
    },
    'REJECTED' : {
      id: 5,
      name: 'Rejected',
      color: ''
    },
    'SUSPENDED' : {
      id: 6,
      name: 'Suspended',
      color: ''
    },
    'BLACKLISTED' : {
      id: 7,
      name: 'Blacklisted',
      color: ''
    },
    'DELETED' : {
      id: 8,
      name: 'Deleted',
      color: ''
    }
  };

  public static dataTableConfig = {
    'columnMode' : 'force',
    'headerHeight' : 50,
    'footerHeight' : 50,
    'rowHeight' : 'auto',
    'selectionType' : 'checkbox',
    'selectAllRowsOnPage' : true,
    'selected' : {},
    'externalPaging' : true,
    'externalSorting' : true,
    'rows' : [],
    'columns' : [],
    'count' : [],
    'offset' : [],
    'limit' : [],
  };
  
}



