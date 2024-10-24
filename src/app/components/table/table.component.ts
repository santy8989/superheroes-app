import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() columns: { header: string; field: string }[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions?: { label: string; icon: string; color?: string; callback: (row: any) => void }[] = [];


  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.field);
    if (this.actions && this.actions.length) {
      this.displayedColumns.push('actions');
    }
  }

  onAction(action: (row: any) => void, row: any): void {
    action(row);
  }
}
