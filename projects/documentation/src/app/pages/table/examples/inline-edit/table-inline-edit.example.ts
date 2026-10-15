import {
  DasarTableComponent,
  DasarTableColumn,
  DasarButtonComponent,
  DasarIconComponent,
  DasarChipComponent,
} from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [
    FormsModule,
    DasarTableComponent,
    DasarButtonComponent,
    DasarIconComponent,
    DasarChipComponent,
  ],
  templateUrl: './table-inline-edit.example.html',
  selector: 'app-table-inline-edit',
  standalone: true,
})
export class TableInlineEditExample {
  protected columns: DasarTableColumn[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'name', label: 'Employee Name' },
    { key: 'role', label: 'Role', width: '150px' },
    { key: 'actions', label: '', align: 'right', width: '160px' },
  ];
  protected employees = [
    { id: '1', name: 'Alice Smith', role: 'Admin', isEditing: false },
    { id: '2', name: 'Bob Jones', role: 'Viewer', isEditing: false },
  ];

  startEdit(row: any) {
    row.isEditing = true;
    row.editName = row.name;
    row.editRole = row.role;
  }

  saveEdit(row: any) {
    row.isEditing = false;
    row.name = row.editName;
    row.role = row.editRole;
  }

  cancelEdit(row: any) {
    row.isEditing = false;
  }
}
