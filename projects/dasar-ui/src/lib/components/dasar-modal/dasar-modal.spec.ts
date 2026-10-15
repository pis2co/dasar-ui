import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DasarModal, DasarModalComponent } from './dasar-modal';
import { DasarThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  imports: [DasarModalComponent],
  template: `
    <dasar-modal [open]="open()" [label]="'Title'" (onClose)="closed.set(closed() + 1)">
      <p>Body</p>
      <div action-slot><button class="action-btn">OK</button></div>
    </dasar-modal>
  `,
})
class ModalHost {
  open = signal(false);
  closed = signal(0);
}

@Component({
  standalone: true,
  imports: [DasarModalComponent],
  template: `<dasar-modal [open]="true" label="Title"></dasar-modal>`,
})
class ThemeDefaultHost {}

describe('DasarModal', () => {
  let fixture: ComponentFixture<ModalHost>;
  let host: ModalHost;

  const container = () => fixture.nativeElement.querySelector('.dasar-modal-container');
  const modalElement = () => fixture.nativeElement.querySelector('dasar-modal') as HTMLElement;
  const open = async (value = true) => {
    host.open.set(value);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ModalHost] }).compileComponents();

    fixture = TestBed.createComponent(ModalHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(fixture.debugElement.query(By.directive(DasarModal))).toBeTruthy();
  });

  it('always has the dasar-modal host class', () => {
    expect(modalElement().classList).toContain('dasar-modal');
  });

  it('renders nothing while closed', () => {
    expect(container()).toBeNull();
    expect(modalElement().classList).not.toContain('open');
  });

  it('renders header, body and actions while open', async () => {
    await open();

    expect(container()).toBeTruthy();
    expect(container().classList).toContain('size-md');
    expect(container().classList).toContain('radius-lg');
    expect(container().classList).toContain('appearance-elevated');
    expect(fixture.nativeElement.querySelector('.dasar-modal-title').textContent).toContain('Title');
    expect(fixture.nativeElement.querySelector('.dasar-modal-body p').textContent).toContain('Body');
    expect(fixture.nativeElement.querySelector('.dasar-modal-actions .action-btn')).toBeTruthy();
    expect(modalElement().classList).toContain('open');
  });

  it('emits onClose from the default close button', async () => {
    await open();

    (fixture.nativeElement.querySelector('.dasar-modal-close dasar-button') as HTMLElement).click();
    await fixture.whenStable();

    expect(host.closed()).toBe(1);
  });

  it('emits onClose on Escape', async () => {
    await open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(host.closed()).toBe(1);
  });

  it('emits onClose when the overlay backdrop is clicked, but not the panel', async () => {
    await open();

    (fixture.nativeElement.querySelector('.dasar-overlay-backdrop') as HTMLElement).click();
    await fixture.whenStable();
    expect(host.closed()).toBe(1);

    (fixture.nativeElement.querySelector('.dasar-modal-body') as HTMLElement).click();
    await fixture.whenStable();
    expect(host.closed()).toBe(1);
  });

  it('does not emit onClose on Escape while closed', async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(host.closed()).toBe(0);
  });

  it('honours close-on-escape=false', async () => {
    const modal = fixture.debugElement.query(By.directive(DasarModal)).componentInstance;
    modal.closeOnEscape = false;
    await open();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(host.closed()).toBe(0);
  });

  it('honours close-on-overlay=false', async () => {
    const modal = fixture.debugElement.query(By.directive(DasarModal)).componentInstance;
    modal.closeOnOverlay = false;
    await open();

    (fixture.nativeElement.querySelector('.dasar-overlay-backdrop') as HTMLElement).click();
    await fixture.whenStable();

    expect(host.closed()).toBe(0);
  });

  it('honours closable=false by hiding the close affordance', async () => {
    await open();
    expect(fixture.nativeElement.querySelector('.dasar-modal-close dasar-button')).toBeTruthy();

    await open(false);
    const modal = fixture.debugElement.query(By.directive(DasarModal)).componentInstance;
    modal.closable = false;
    await open();

    expect(fixture.nativeElement.querySelector('.dasar-modal-close')).toBeNull();
  });

  it('sets an explicit width over the size default', async () => {
    await open();
    expect(container().style.width).toBe('');

    await open(false);
    const modal = fixture.debugElement.query(By.directive(DasarModal)).componentInstance;
    modal.width = '320px';
    await open();

    expect(container().style.width).toBe('320px');
  });

  it('locks body scroll while open and restores it when closed', async () => {
    await open();
    expect(document.body.style.overflow).toBe('hidden');

    await open(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('restores body scroll when destroyed while open', async () => {
    await open();
    expect(document.body.style.overflow).toBe('hidden');

    fixture.destroy();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('DasarModal slots and theme defaults', () => {
  it('replaces the label with the header slot content', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <dasar-modal [open]="true" label="Title">
          <div header-slot><span class="custom-header">Custom</span></div>
        </dasar-modal>
      `,
    })
    class HeaderSlotHost {}

    await TestBed.configureTestingModule({ imports: [HeaderSlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(HeaderSlotHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.custom-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.dasar-modal-title')).toBeNull();
  });

  it('replaces the default close button with the close slot', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <dasar-modal [open]="true" label="Title">
          <button class="custom-close" close-slot>X</button>
        </dasar-modal>
      `,
    })
    class CloseSlotHost {}

    await TestBed.configureTestingModule({ imports: [CloseSlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(CloseSlotHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.custom-close')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.dasar-modal-close dasar-button')).toBeNull();
  });

  it('takes the default size from the theme service config', async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDefaultHost],
      providers: [DasarThemeService],
    }).compileComponents();

    TestBed.inject(DasarThemeService).setGlobalTheme({
      mode: 'light',
      components: { modal: { size: 'lg' } },
    });

    const fixture = TestBed.createComponent(ThemeDefaultHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.dasar-modal-container').classList).toContain(
      'size-lg',
    );
  });

  it('takes the default appearance from the theme service config', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `<dasar-modal [open]="true" label="Title"></dasar-modal>`,
    })
    class AppearanceHost {}

    await TestBed.configureTestingModule({
      imports: [AppearanceHost],
      providers: [DasarThemeService],
    }).compileComponents();

    TestBed.inject(DasarThemeService).setGlobalTheme({
      mode: 'light',
      components: { modal: { appearance: 'outline', closable: false } },
    });

    const fixture = TestBed.createComponent(AppearanceHost);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.dasar-modal-container');
    expect(container.classList).toContain('appearance-outline');
    expect(container.classList).toContain('size-md');
  });
});
