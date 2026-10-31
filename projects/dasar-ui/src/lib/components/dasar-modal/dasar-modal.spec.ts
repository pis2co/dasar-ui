import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarModalComponent } from './dasar-modal';
import { DasarThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  imports: [DasarModalComponent],
  template: `
    <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
    <ng-template #modalTpl let-close="close">
      <dasar-modal label="Title">
        <p>Body</p>
        <div action-slot><button class="action-btn" (click)="close()">OK</button></div>
      </dasar-modal>
    </ng-template>
  `,
})
class ModalHost {}

describe('DasarModal', () => {
  let fixture: ComponentFixture<ModalHost>;

  const triggerBtn = () => fixture.nativeElement.querySelector('.trigger-btn') as HTMLElement;
  const container = () => document.querySelector('.dasar-modal-container');
  const modalElement = () => document.querySelector('dasar-modal') as HTMLElement | null;

  const openDialog = async () => {
    triggerBtn().click();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ModalHost] }).compileComponents();
    fixture = TestBed.createComponent(ModalHost);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('dasar-modal').forEach((el) => el.remove());
  });

  it('should create', async () => {
    await openDialog();
    expect(document.querySelector('.dasar-modal-container')).toBeTruthy();
  });

  it('renders nothing before the trigger is activated', () => {
    expect(container()).toBeNull();
  });

  it('renders header, body and actions when opened', async () => {
    await openDialog();

    expect(container()).toBeTruthy();
    expect(container()!.classList).toContain('size-md');
    expect(container()!.classList).toContain('radius-lg');
    expect(container()!.classList).toContain('appearance-elevated');
    expect(document.querySelector('.dasar-modal-title')!.textContent).toContain('Title');
    expect(document.querySelector('.dasar-modal-body p')!.textContent).toContain('Body');
    expect(document.querySelector('.dasar-modal-actions .action-btn')).toBeTruthy();
  });

  it('closes when the template close() callback is invoked', async () => {
    await openDialog();
    expect(container()).toBeTruthy();

    (document.querySelector('.action-btn') as HTMLElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(container()).toBeNull();
  });

  it('closes when the default close button is clicked', async () => {
    await openDialog();

    (document.querySelector('.dasar-modal-close dasar-button') as HTMLElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(container()).toBeNull();
  });

  it('closes on Escape by default', async () => {
    await openDialog();

    container()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    // The escape handler is attached outside the Angular zone, so its async close()
    // chain settles on a real macrotask rather than one `whenStable()` can observe.
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    expect(container()).toBeNull();
  });

  it('honours dasarModalTriggerCloseOnEscape=false', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button
          class="trigger-btn"
          [dasarModalTrigger]="modalTpl"
          [dasarModalTriggerCloseOnEscape]="false"
        >
          Open
        </button>
        <ng-template #modalTpl>
          <dasar-modal label="Title"><p>Body</p></dasar-modal>
        </ng-template>
      `,
    })
    class NoEscapeHost {}

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [NoEscapeHost] }).compileComponents();
    const noEscapeFixture = TestBed.createComponent(NoEscapeHost);
    noEscapeFixture.detectChanges();

    (noEscapeFixture.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await noEscapeFixture.whenStable();
    noEscapeFixture.detectChanges();
    expect(container()).toBeTruthy();

    container()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await noEscapeFixture.whenStable();
    noEscapeFixture.detectChanges();

    expect(container()).toBeTruthy();
    document.querySelectorAll('dasar-modal').forEach((el) => el.remove());
  });

  it('honours closable=false by hiding the close affordance', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
        <ng-template #modalTpl>
          <dasar-modal label="Title" [closable]="false"><p>Body</p></dasar-modal>
        </ng-template>
      `,
    })
    class NotClosableHost {}

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [NotClosableHost] }).compileComponents();
    const f = TestBed.createComponent(NotClosableHost);
    f.detectChanges();
    (f.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await f.whenStable();
    f.detectChanges();

    expect(document.querySelector('.dasar-modal-close')).toBeNull();
  });

  it('sets an explicit width over the size default', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
        <ng-template #modalTpl>
          <dasar-modal label="Title" width="320px"><p>Body</p></dasar-modal>
        </ng-template>
      `,
    })
    class WidthHost {}

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [WidthHost] }).compileComponents();
    const f = TestBed.createComponent(WidthHost);
    f.detectChanges();
    (f.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await f.whenStable();
    f.detectChanges();

    expect((document.querySelector('.dasar-modal-container') as HTMLElement).style.width).toBe(
      '320px',
    );
  });
});

describe('DasarModal slots and theme defaults', () => {
  afterEach(() => {
    document.querySelectorAll('dasar-modal').forEach((el) => el.remove());
  });

  it('replaces the label with the header slot content', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
        <ng-template #modalTpl>
          <dasar-modal label="Title">
            <div header-slot><span class="custom-header">Custom</span></div>
          </dasar-modal>
        </ng-template>
      `,
    })
    class HeaderSlotHost {}

    await TestBed.configureTestingModule({ imports: [HeaderSlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(HeaderSlotHost);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.querySelector('.custom-header')).toBeTruthy();
    expect(document.querySelector('.dasar-modal-title')).toBeNull();
  });

  it('replaces the default close button with the close slot', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
        <ng-template #modalTpl>
          <dasar-modal label="Title">
            <button class="custom-close" close-slot>X</button>
          </dasar-modal>
        </ng-template>
      `,
    })
    class CloseSlotHost {}

    await TestBed.configureTestingModule({ imports: [CloseSlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(CloseSlotHost);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.querySelector('.custom-close')).toBeTruthy();
    expect(document.querySelector('.dasar-modal-close dasar-button')).toBeNull();
  });

  it('takes the default size and appearance from the theme service config', async () => {
    @Component({
      standalone: true,
      imports: [DasarModalComponent],
      template: `
        <button class="trigger-btn" [dasarModalTrigger]="modalTpl">Open</button>
        <ng-template #modalTpl>
          <dasar-modal label="Title"><p>Body</p></dasar-modal>
        </ng-template>
      `,
    })
    class ThemeDefaultHost {}

    await TestBed.configureTestingModule({
      imports: [ThemeDefaultHost],
      providers: [DasarThemeService],
    }).compileComponents();

    TestBed.inject(DasarThemeService).setGlobalTheme({
      mode: 'light',
      components: { modal: { size: 'lg', appearance: 'outline' } },
    });

    const fixture = TestBed.createComponent(ThemeDefaultHost);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.trigger-btn') as HTMLElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = document.querySelector('.dasar-modal-container')!;
    expect(el.classList).toContain('size-lg');
    expect(el.classList).toContain('appearance-outline');
  });
});
