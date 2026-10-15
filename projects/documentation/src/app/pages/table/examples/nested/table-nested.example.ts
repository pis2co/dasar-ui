import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table-nested',
  standalone: true,
  imports: [DasarTableComponent],
  templateUrl: './table-nested.example.html',
})
export class TableNestedExample {
  protected columns: DasarTableColumn[] = [
    { key: 'name', label: 'Department Name', cellStyle: { fontWeight: 'bold' } },
    { key: 'manager', label: 'Manager' },
    { key: 'headcount', label: 'Headcount', align: 'right' },
  ];
  protected employeeColumns: DasarTableColumn[] = [
    { key: 'id', label: 'Emp ID', width: '80px' },
    { key: 'title', label: 'Job Title' },
    { key: 'name', label: 'Name' },
  ];
  protected departments = [
    {
      name: 'Engineering',
      manager: 'Sarah Connor',
      headcount: 3,
      employees: [
        { id: 'E101', name: 'John Doe', title: 'Frontend Developer' },
        { id: 'E102', name: 'Jane Smith', title: 'Backend Developer' },
        { id: 'E103', name: 'Mike Johnson', title: 'DevOps Engineer' },
      ],
    },
    {
      name: 'Design',
      manager: 'Alan Turing',
      headcount: 2,
      employees: [
        { id: 'D201', name: 'Emily Davis', title: 'UI Designer' },
        { id: 'D202', name: 'Chris Lee', title: 'UX Researcher' },
      ],
    },
  ];
}
