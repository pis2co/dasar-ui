import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DasarChip,
  DasarChipComponent,
  DasarChipAppearanceType,
  DasarChipVariantType,
} from './dasar-chip';

@Component({
  selector: 'test-chip-host',
  standalone: true,
  imports: [DasarChipComponent],
  template: `
    <dasar-chip
      [appearance]="appearance()"
      [variant]="variant()"
      [disabled]="disabled()"
      [label]="label()"
    ></dasar-chip>
  `,
})
class ChipHostComponent {
  appearance = signal<DasarChipAppearanceType>('solid');
  variant = signal<DasarChipVariantType>('primary');
  disabled = signal(false);
  label = signal('Test Chip');
}

describe('DasarChip regression coverage for dasar-button integration', () => {
  let fixture: ComponentFixture<ChipHostComponent>;
  let host: ChipHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipHostComponent);
    host = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create chip component', () => {
    const chipEl = fixture.nativeElement.querySelector('dasar-chip');
    expect(chipEl).toBeTruthy();
  });

  it('passes through appearance input to the underlying dasar-button', async () => {
    const nativeBtn = fixture.nativeElement.querySelector(
      '.dasar-button-native',
    ) as HTMLButtonElement;
    expect(nativeBtn).toBeTruthy();

    // Default appearance is 'solid', which in dasar-button does not add a class for 'solid'
    expect(nativeBtn.classList).not.toContain('outline');
    expect(nativeBtn.classList).not.toContain('subtle');

    // Change appearance to 'outline'
    host.appearance.set('outline');
    await fixture.whenStable();
    expect(nativeBtn.classList).toContain('outline');

    // Change appearance to 'subtle'
    host.appearance.set('subtle');
    await fixture.whenStable();
    expect(nativeBtn.classList).toContain('subtle');
    expect(nativeBtn.classList).not.toContain('outline');
  });

  it('passes through variant input to the underlying dasar-button', async () => {
    const nativeBtn = fixture.nativeElement.querySelector(
      '.dasar-button-native',
    ) as HTMLButtonElement;

    // Default variant is 'primary'
    expect(nativeBtn.classList).toContain('primary');

    // Change variant to 'secondary'
    host.variant.set('secondary');
    await fixture.whenStable();
    expect(nativeBtn.classList).toContain('secondary');
    expect(nativeBtn.classList).not.toContain('primary');

    // Change variant to 'danger'
    host.variant.set('danger');
    await fixture.whenStable();
    expect(nativeBtn.classList).toContain('danger');
    expect(nativeBtn.classList).not.toContain('secondary');
  });

  it('disables the underlying button when chip disabled input is true', async () => {
    const nativeBtn = fixture.nativeElement.querySelector(
      '.dasar-button-native',
    ) as HTMLButtonElement;
    const buttonHost = fixture.nativeElement.querySelector('dasar-button');

    // Initially not disabled
    expect(nativeBtn.disabled).toBe(false);
    expect(buttonHost.classList).not.toContain('disabled');

    // Set disabled to true
    host.disabled.set(true);
    await fixture.whenStable();

    // The rendered native button must be disabled (checking disabled and/or aria-disabled)
    const isDisabled =
      nativeBtn.disabled === true ||
      nativeBtn.getAttribute('disabled') !== null ||
      nativeBtn.getAttribute('aria-disabled') === 'true';
    expect(isDisabled).toBe(true);
    expect(buttonHost.classList).toContain('disabled');
  });
});
