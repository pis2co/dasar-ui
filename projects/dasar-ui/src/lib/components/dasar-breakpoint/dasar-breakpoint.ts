import {
  ViewEncapsulation,
  HostBinding,
  EventEmitter,
  Component,
  untracked,
  computed,
  inject,
  effect,
  signal,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { DasarBreakpointService, DasarBreakpointState } from '../../services/breakpoint.service';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DasarThemeService } from '../../services/theme.service';
import { DasarBreakpointName } from '../../models/theme.model';
import { resolveThemeDefault } from '../../utils/common';

export interface DasarBreakpointConfig {
  hiddenAt?: DasarBreakpointName[] | null;
  showAt?: DasarBreakpointName[] | null;
}

export const normalizeBreakpointList = (
  value: DasarBreakpointName[] | string | null | undefined,
): DasarBreakpointName[] => {
  if (!value) return [];
  const names: DasarBreakpointName[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const parts = Array.isArray(value) ? value : String(value).split(/[\s,]+/);
  return parts
    .map((part) => String(part).trim().toLowerCase())
    .filter((part): part is DasarBreakpointName => names.includes(part as DasarBreakpointName));
};

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-breakpoint.scss'],
  templateUrl: './dasar-breakpoint.html',
  selector: 'dasar-breakpoint',
  imports: [CommonModule],
  standalone: true,
})
export class DasarBreakpoint {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private breakpoint = inject(DasarBreakpointService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private hiddenList = signal<DasarBreakpointName[]>(
    resolveThemeDefault('breakpoint', 'hiddenAt', null, this.themeProvider, this.themeService) ??
      [],
  );
  private showList = signal<DasarBreakpointName[]>(
    resolveThemeDefault('breakpoint', 'showAt', null, this.themeProvider, this.themeService) ?? [],
  );
  private lastName: DasarBreakpointName | null = null;
  private lastVisible: boolean | null = null;

  readonly visible = computed(() => {
    const show = this.showList();
    const hidden = this.hiddenList();
    const name = this.breakpoint.name();
    if (show.length > 0) return show.includes(name);
    if (hidden.length > 0) return !hidden.includes(name);
    return true;
  });

  constructor() {
    effect(() => {
      const state = this.breakpoint.state();
      const visible = this.visible();
      if (this.lastName === null) {
        this.lastName = state.name;
        this.lastVisible = visible;
        if (this.isBrowser) untracked(() => this.onMediaUpdate.emit(state));
        return;
      }
      if (state.name !== this.lastName) {
        this.lastName = state.name;
        untracked(() => this.onMediaUpdate.emit(state));
      }
      if (visible !== this.lastVisible) {
        this.lastVisible = visible;
        untracked(() => {
          if (visible) this.onShow.emit(state);
          else this.onHidden.emit(state);
        });
      }
    });
  }

  @Input({ alias: 'hidden-at' })
  set hiddenAt(value: DasarBreakpointName[] | string | null) {
    this.hiddenList.set(normalizeBreakpointList(value));
    this.warnOnConflict();
  }
  get hiddenAt(): DasarBreakpointName[] {
    return this.hiddenList();
  }

  @Input({ alias: 'show-at' })
  set showAt(value: DasarBreakpointName[] | string | null) {
    this.showList.set(normalizeBreakpointList(value));
    this.warnOnConflict();
  }
  get showAt(): DasarBreakpointName[] {
    return this.showList();
  }

  @Output() onMediaUpdate = new EventEmitter<DasarBreakpointState>();
  @Output() onHidden = new EventEmitter<DasarBreakpointState>();
  @Output() onShow = new EventEmitter<DasarBreakpointState>();

  @HostBinding('class')
  get hostClasses(): string {
    return `dasar-breakpoint ${this.breakpoint.name()}`;
  }

  @HostBinding('attr.hidden')
  get hiddenAttr(): string | null {
    return this.visible() ? null : '';
  }

  private warnOnConflict(): void {
    if (this.hiddenList().length > 0 && this.showList().length > 0) {
      console.warn('dasar-breakpoint: show-at wins when both hidden-at and show-at are set.');
    }
  }
}

export const DasarBreakpointComponent = [DasarBreakpoint] as const;
