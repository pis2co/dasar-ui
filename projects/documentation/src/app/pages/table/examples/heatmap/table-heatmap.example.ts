import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './table-heatmap.example.html',
  imports: [DasarTableComponent],
  selector: 'app-table-heatmap',
  standalone: true,
})
export class TableHeatmapExample implements OnInit {
  public columns: DasarTableColumn[] = [];
  public heatmapData: any[] = [];

  ngOnInit() {
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.columns = [
      {
        key: 'day',
        label: 'Day',
        width: '100px',
        cellStyle: { fontWeight: '600', backgroundColor: 'var(--dasar-theme-bg-surface-color)' },
      },
    ];
    hours.forEach((hour) => {
      this.columns.push({
        key: hour,
        label: hour,
        align: 'center',
        headerStyle: { fontSize: '11px', padding: '8px 4px' },
        cellStyle: (row: any) => {
          const val = row[hour];
          const intensity = Math.min(1, val / 100);
          return {
            backgroundColor: `rgba(16, 185, 129, ${intensity})`,
            color: intensity > 0.55 ? '#ffffff' : 'var(--dasar-theme-text-primary-color)',
            border: '1px solid var(--dasar-theme-bg-default-color)',
            fontSize: '12px',
            fontWeight: '500',
          };
        },
      });
    });
    this.heatmapData = days.map((day) => {
      const rowData: any = { day };
      hours.forEach((hour) => {
        rowData[hour] = Math.floor(Math.random() * 101);
      });
      return rowData;
    });
  }
}
