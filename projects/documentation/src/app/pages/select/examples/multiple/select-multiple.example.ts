import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarSelectComponent],
  templateUrl: './select-multiple.example.html',
  selector: 'app-select-multiple-example',
  standalone: true,
})
export class SelectMultipleExample {
  protected selectedUsersText: string[] = ['2'];
  protected selectedRoles: string[] = ['admin', 'editor'];

  protected users: DasarSelectOption[] = [
    { label: 'Alice Johnson', value: '1' },
    { label: 'Bob Smith', value: '2' },
    { label: 'Charlie Davis', value: '3' },
    { label: 'Diana Prince', value: '4' },
    { label: 'Evan Wright', value: '5' },
    { label: 'Fiona Gallagher', value: '6' },
    { label: 'George Washington', value: '7' },
    { label: 'Hannah Abbott', value: '8' },
    { label: 'Ian Malcolm', value: '9' },
    { label: 'Julia Roberts', value: '10' },
    { label: 'Kevin Hart', value: '11' },
    { label: 'Laura Croft', value: '12' },
    { label: 'Michael Scott', value: '13' },
    { label: 'Natalie Portman', value: '14' },
    { label: 'Oscar Martinez', value: '15' },
    { label: 'Penelope Cruz', value: '16' },
    { label: 'Quentin Tarantino', value: '17' },
    { label: 'Rachel Green', value: '18' },
    { label: 'Steve Rogers', value: '19' },
    { label: 'Taylor Swift', value: '20' },
  ];
  protected roles: DasarSelectOption[] = [
    { label: 'Admin', value: 'admin', chipVariant: 'danger' },
    { label: 'Editor', value: 'editor', chipVariant: 'warning' },
    { label: 'Viewer', value: 'viewer', chipVariant: 'ghost' },
    { label: 'Super Admin', value: 'super_admin', chipVariant: 'danger' },
    { label: 'Content Manager', value: 'content_manager', chipVariant: 'warning' },
    { label: 'Moderator', value: 'moderator', chipVariant: 'secondary' },
    { label: 'Contributor', value: 'contributor', chipVariant: 'primary' },
    { label: 'Subscriber', value: 'subscriber', chipVariant: 'ghost' },
    { label: 'Billing Manager', value: 'billing_manager', chipVariant: 'success' },
    { label: 'Support Agent', value: 'support_agent', chipVariant: 'secondary' },
    { label: 'Developer', value: 'developer', chipVariant: 'primary' },
    { label: 'QA Engineer', value: 'qa_engineer', chipVariant: 'warning' },
    { label: 'Product Owner', value: 'product_owner', chipVariant: 'success' },
    { label: 'Data Analyst', value: 'data_analyst', chipVariant: 'secondary' },
    { label: 'Marketing Lead', value: 'marketing_lead', chipVariant: 'primary' },
    { label: 'Sales Rep', value: 'sales_rep', chipVariant: 'success' },
    { label: 'Guest', value: 'guest', chipVariant: 'ghost' },
    { label: 'Auditor', value: 'auditor', chipVariant: 'warning' },
    { label: 'Security Officer', value: 'security_officer', chipVariant: 'danger' },
    { label: 'System Operator', value: 'system_operator', chipVariant: 'primary' },
  ];
}
