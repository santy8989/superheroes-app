import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule,MatPaginatorIntl} from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private paginatorIntl: MatPaginatorIntl) {}
  
  @Input() columns: { header: string; field: string }[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions?: { icon: string; color?: string; callback: (row: any) => void }[] = [];
  
  displayedColumns: string[] = [];
  dataSourceWithPagination = new MatTableDataSource<any>(this.dataSource);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.paginatorIntl.itemsPerPageLabel = 'Ítems por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    this.paginatorIntl.changes.next();
    
    this.displayedColumns = this.columns.map(col => col.field);
    if (this.actions && this.actions.length) {
      this.displayedColumns.push('actions');
    }
    this.dataSourceWithPagination = new MatTableDataSource(this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSourceWithPagination.paginator = this.paginator;
    this.dataSourceWithPagination.sort = this.sort;
  }

  ngOnChanges(): void {
    this.dataSourceWithPagination.data = this.dataSource;
  }

  onAction(action: (row: any) => void, row: any): void {
    action(row);
  }
}